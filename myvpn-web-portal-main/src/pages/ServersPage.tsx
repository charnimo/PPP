
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Server } from "lucide-react";
import ServerSelector from "@/components/ServerSelector";
import {  Navigate } from "react-router-dom";

const ServersPage = () => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  const [selectedServer, setSelectedServer] = useState("New York, US");

  return (
    <>
      <Helmet>
        <title>Server Locations | MY_VPN</title>
      </Helmet>
      <div className="container mx-auto py-6 px-4 max-w-5xl">
        <h1 className="text-3xl font-bold mb-6">Server Locations</h1>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Servers</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ServerSelector 
                onServerSelect={setSelectedServer}
                selectedServer={selectedServer}
              />
              
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Server className="h-5 w-5 text-primary" />
                    <CardTitle>Selected Server Info</CardTitle>
                  </div>
                  <CardDescription>Information about the selected server</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Location</p>
                        <p className="text-base font-medium">{selectedServer}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Status</p>
                        <div className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                          <p className="text-base font-medium">Online</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Load</p>
                        <p className="text-base font-medium">42%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Distance</p>
                        <p className="text-base font-medium">1,432 km</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">IP Version</p>
                        <p className="text-base font-medium">IPv4 & IPv6</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Protocol</p>
                        <p className="text-base font-medium">OpenVPN, WireGuard</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <CardTitle>Server Map</CardTitle>
                </div>
                <CardDescription>Global server distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Server map visualization would appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="recommended">
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">
                  Recommended servers based on your location and usage will appear here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="favorites">
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">
                  Your favorite servers will appear here after you save them.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ServersPage;
