import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Server,
  Wifi,
  Clock,
  MapPin,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeadscaleNode {
  id: string;
  hostname: string;
  name: string;
  machineKey: string;
  nodeKey: string;
  user: string;
  ipAddresses: string[];
  ephemeral: boolean;
  lastSeen: string;
  expiration: string;
  connected: boolean;
  expired: boolean;
}

interface ServerData {
  serverId: string;
  serverName: string;
  nodes: HeadscaleNode[];
  lastUpdated: string;
}

const Admin = () => {
  const [serversData, setServersData] = useState<ServerData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [error, setError] = useState<string | null>(null);

  const fetchServersData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No authentication token found. Please login first.");

      const response = await window.electron.ipcRenderer.invoke("api-request", {
        path: "/servers",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response || !response.data || response.statusCode != 200) {
        throw new Error("Invalid response from API.");
      }

      let parsedData: any;
      if (typeof response.data === "string") {
        parsedData = JSON.parse(response.data);
      } else {
        parsedData = response.data;
      }

      const serverList: ServerData[] = parsedData as ServerData[];
      console.log(serverList);
      setServersData(serverList);
      setLastRefresh(new Date());
    } catch (err) {
      console.error("Error fetching server data:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServersData();
  }, []);

  const handleRefresh = () => {
    fetchServersData();
  };

  const getTotalUsers = () => {
    const users = serversData.flatMap((s) => s.nodes.map((n) => n.user));
    return new Set(users).size;
  };

  const getTotalConnectedNodes = () => {
    return serversData.reduce(
      (acc, s) => acc + s.nodes.filter((n) => n.online).length,
      0
    );
  };

  const getTotalNodes = () => {
    return serversData.reduce((acc, s) => acc + s.nodes.length, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Monitor active users and server connections
          </p>
        </div>
        <Button onClick={handleRefresh} disabled={isLoading}>
          <Wifi className="mr-2 h-4 w-4" />
          {isLoading ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
              <AlertCircle className="h-4 w-4" />
              <span className="font-medium">Error:</span>
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Servers</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{serversData.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTotalUsers()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected Nodes</CardTitle>
            <Wifi className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {getTotalConnectedNodes()} / {getTotalNodes()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Refresh</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">
              {lastRefresh.toLocaleTimeString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {!isLoading &&
        !error &&
        serversData.map((server) => (
          <Card key={server.serverId}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                {server.serverName}
              </CardTitle>
              <CardDescription>
                Server ID: {server.serverId} | Last Updated:{" "}
                {server.lastUpdated}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {server.nodes.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No nodes found for this server
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-200 dark:border-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-4 py-2 border">ID</th>

                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">User</th>
                        <th className="px-4 py-2 border">IP Addresses</th>
                        <th className="px-4 py-2 border">Status</th>
                        <th className="px-4 py-2 border">Last Seen</th>
                        <th className="px-4 py-2 border">Ephemeral</th>
                      </tr>
                    </thead>
                    <tbody>
                      {server.nodes.map((node) => (
                        <tr key={node.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="px-4 py-2 border font-mono text-sm">{node.id}</td>
                          <td className="px-4 py-2 border font-mono text-sm">{node.name}</td>
                          <td className="px-4 py-2 border">
                            <Badge variant="secondary">{node.user.name}</Badge>
                          </td>
                          <td className="px-4 py-2 border space-y-1">
                           

                                {node.ipaddresses[0]}

                           
                          </td>
                          <td className="px-4 py-2 border space-y-1">
                            <Badge variant={node.connected ? "default" : "secondary"}>
                              {node.online ? "Online" : "Offline"}
                            </Badge>
                            {node.expired && (
                              <Badge variant="destructive">Expired</Badge>
                            )}
                          </td>
                          <td className="px-4 py-2 border font-mono text-sm">{new Date(node.lastseen.seconds * 1000).toLocaleString()}</td>
                          <td className="px-4 py-2 border">
                            <Badge variant={node.ephemeral ? "outline" : "secondary"}>
                              {node.ephemeral ? "Yes" : "No"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

      {isLoading && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading server data...</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Admin;
