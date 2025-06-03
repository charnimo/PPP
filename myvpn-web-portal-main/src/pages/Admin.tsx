import { useState, useEffect } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Server, Wifi, Clock, MapPin } from "lucide-react";
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

  // Mock data to simulate the headscale server response
  const mockData: ServerData[] = [
    {
      serverId: "headscale-1",
      serverName: "Primary Headscale Server",
      lastUpdated: "2025-01-03T10:30:00Z",
      nodes: [
        {
          id: "1",
          hostname: "kali",
          name: "kali",
          machineKey: "[4Gm15]",
          nodeKey: "[8df@0]",
          user: "ppp",
          ipAddresses: ["100.64.0.1", "fd7a:115c:a1e0:r11"],
          ephemeral: false,
          lastSeen: "2025-01-16 17:19:50",
          expiration: "N/A",
          connected: false,
          expired: false
        },
        {
          id: "2",
          hostname: "machine",
          name: "machine",
          machineKey: "[G3pt1]",
          nodeKey: "[dMJeY]",
          user: "ppp",
          ipAddresses: ["100.64.0.2", "fd7a:115c:a1e0:r12"],
          ephemeral: false,
          lastSeen: "2025-01-16 17:20:10",
          expiration: "N/A",
          connected: true,
          expired: false
        },
        {
          id: "3",
          hostname: "kali",
          name: "kali-8dzwqjGvt",
          machineKey: "[Nedme]",
          nodeKey: "[RGVkl]",
          user: "ppp",
          ipAddresses: ["100.64.0.3", "fd7a:115c:a1e0:r13"],
          ephemeral: false,
          lastSeen: "2025-01-16 17:25:10",
          expiration: "N/A",
          connected: true,
          expired: false
        }
      ]
    },
    {
      serverId: "headscale-2",
      serverName: "Secondary Headscale Server",
      lastUpdated: "2025-01-03T10:28:00Z",
      nodes: [
        {
          id: "4",
          hostname: "localhost",
          name: "localhost",
          machineKey: "[EtLR5]",
          nodeKey: "[G5rGa]",
          user: "ppp",
          ipAddresses: ["100.64.0.29", "fd7a:115c:a1e0:r17"],
          ephemeral: false,
          lastSeen: "2025-05-06 15:31:40",
          expiration: "N/A",
          connected: false,
          expired: false
        }
      ]
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch data from headscale servers
    const fetchData = async () => {
      setIsLoading(true);
      // In a real implementation, this would fetch from actual headscale API endpoints
      setTimeout(() => {
        setServersData(mockData);
        setIsLoading(false);
        setLastRefresh(new Date());
      }, 1000);
    };

    fetchData();
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setServersData(mockData);
      setIsLoading(false);
      setLastRefresh(new Date());
    }, 1000);
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
        {serversData.map((server) => (
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
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Hostname</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>IP Addresses</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Seen</TableHead>
                      <TableHead>Ephemeral</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {server.nodes.map((node) => (
                      <TableRow key={node.id}>
                        <TableCell className="font-mono text-sm">{node.id}</TableCell>
                        <TableCell className="font-medium">{node.hostname}</TableCell>
                        <TableCell className="font-mono text-sm">{node.name}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{node.user}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {node.ipAddresses.map((ip, index) => (
                              <div key={index} className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                <MapPin className="inline h-3 w-3 mr-1" />
                                {ip}
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Badge variant={node.connected ? "default" : "secondary"}>
                              {node.connected ? "Online" : "Offline"}
                            </Badge>
                            {node.expired && (
                              <Badge variant="destructive">Expired</Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {node.lastSeen}
                        </TableCell>
                        <TableCell>
                          <Badge variant={node.ephemeral ? "outline" : "secondary"}>
                            {node.ephemeral ? "Yes" : "No"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
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
