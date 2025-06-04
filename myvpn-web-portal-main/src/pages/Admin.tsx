import { useState, useEffect } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// Note: Using basic table styling since @/components/ui/table is not available
import { Users, Server, Wifi, Clock, MapPin, AlertCircle } from "lucide-react";
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
  lastSeen: string;     // ISO date string
  expiration: string;   // ISO date string
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

  // Function to fetch data from /servers endpoint
  const fetchServersData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const token = localStorage.getItem("auth_key");
      
      if (!token) {
        throw new Error("No authentication token found. Please login first.");
      }

      const response = await window.electron.ipcRenderer.invoke("api-request", {
        path: "/servers",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API Response:", response); // Debug log

      // Check if response and response.data exist
      if (!response) {
        throw new Error("No response received from server");
      }

      if (!response.data) {
        throw new Error("No data in response");
      }

      // Handle different response formats
      let data;
      if (typeof response.data === 'string') {
        data = JSON.parse(response.data);
      } else if (typeof response.data === 'object') {
        data = response.data; // Already parsed
      } else {
        throw new Error("Invalid response data format");
      }
      
      // Transform the API response to match the component's expected format
      // Adjust this based on your actual JSON structure from /servers
      let transformedData: ServerData[];
      
      if (Array.isArray(data)) {
        // If data is an array of servers
        transformedData = data.map((server: any, index: number) => ({
          serverId: server.id || `server-${index}`,
          serverName: server.name || `Headscale Server ${index + 1}`,
          lastUpdated: server.lastUpdated || new Date().toISOString(),
          nodes: server.nodes || [],
        }));
      } else if (data.servers && Array.isArray(data.servers)) {
        // If data has a servers array property
        transformedData = data.servers.map((server: any, index: number) => ({
          serverId: server.id || `server-${index}`,
          serverName: server.name || `Headscale Server ${index + 1}`,
          lastUpdated: server.lastUpdated || new Date().toISOString(),
          nodes: server.nodes || [],
        }));
      } else {
        // If it's a single server with nodes
        transformedData = [{
          serverId: data.id || "default",
          serverName: data.name || "Headscale Server",
          lastUpdated: data.lastUpdated || new Date().toISOString(),
          nodes: data.nodes || data,
        }];
      }
      
      setServersData(transformedData);
      setLastRefresh(new Date());
      
    } catch (err) {
      console.error("Error fetching servers data:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch data");
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
    const allUsers = serversData.flatMap(server => server.nodes.map(node => node.user));
    return new Set(allUsers).size;
  };

  const getTotalConnectedNodes = () => {
    return serversData.reduce((total, server) => 
      total + server.nodes.filter(node => node.connected).length, 0
    );
  };

  const getTotalNodes = () => {
    return serversData.reduce((total, server) => total + server.nodes.length, 0);
  };

  return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Monitor active users and server connections
            </p>
          </div>
          <Button onClick={handleRefresh} disabled={isLoading}>
            <Wifi className="mr-2 h-4 w-4" />
            {isLoading ? "Refreshing..." : "Refresh"}
          </Button>
        </div>

        {/* Error Display */}
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

        {/* Stats Cards */}
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

        {/* Server Tables */}
        {!isLoading && !error && serversData.map((server) => (
          <Card key={server.serverId} className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                {server.serverName}
              </CardTitle>
              <CardDescription>
                Server ID: {server.serverId} | Last Updated: {new Date(server.lastUpdated).toLocaleString()}
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
                        <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-sm font-medium">ID</th>
                        <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-sm font-medium">Hostname</th>
                        <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-sm font-medium">Name</th>
                        <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-sm font-medium">User</th>
                        <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-sm font-medium">IP Addresses</th>
                        <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-sm font-medium">Status</th>
                        <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-sm font-medium">Last Seen</th>
                        <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-sm font-medium">Ephemeral</th>
                      </tr>
                    </thead>
                    <tbody>
                      {server.nodes.map((node) => (
                        <tr key={node.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-mono text-sm">{node.id}</td>
                          <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-medium">{node.hostname}</td>
                          <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-mono text-sm">{node.name}</td>
                          <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                            <Badge variant="secondary">{node.user}</Badge>
                          </td>
                          <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                            <div className="space-y-1">
                              {node.ipAddresses?.map((ip, index) => (
                                <div key={index} className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                  <MapPin className="inline h-3 w-3 mr-1" />
                                  {ip}
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                            <div className="space-y-1">
                              <Badge variant={node.connected ? "default" : "secondary"}>
                                {node.connected ? "Online" : "Offline"}
                              </Badge>
                              {node.expired && (
                                <Badge variant="destructive">Expired</Badge>
                              )}
                            </div>
                          </td>
                          <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-mono text-sm">
                            {node.lastSeen}
                          </td>
                          <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
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
