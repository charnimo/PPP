
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {  Navigate } from "react-router-dom";

const SettingsPage = () => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <Helmet>
        <title>Settings</title>
      </Helmet>
      <div className="container mx-auto py-6 px-4 max-w-5xl">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="connection">Connection</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage your application preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="autoconnect">Auto-connect on startup</Label>
                      <p className="text-sm text-muted-foreground">Connect to VPN when the application starts</p>
                    </div>
                    <Switch id="autoconnect" />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="startminimized">Start minimized</Label>
                      <p className="text-sm text-muted-foreground">Start the application in the system tray</p>
                    </div>
                    <Switch id="startminimized" />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="notifications">Enable notifications</Label>
                      <p className="text-sm text-muted-foreground">Show notifications for connection events</p>
                    </div>
                    <Switch id="notifications" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="english">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                        <SelectItem value="japanese">Japanese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="connection">
            <Card>
              <CardHeader>
                <CardTitle>Connection Settings</CardTitle>
                <CardDescription>Configure your VPN connection preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="protocol">VPN Protocol</Label>
                    <Select defaultValue="auto">
                      <SelectTrigger id="protocol">
                        <SelectValue placeholder="Select protocol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Automatic (recommended)</SelectItem>
                        <SelectItem value="openvpn">OpenVPN</SelectItem>
                        <SelectItem value="wireguard">WireGuard</SelectItem>
                        <SelectItem value="ikev2">IKEv2</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">Select the VPN protocol to use for your connections</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="killswitch">Kill Switch</Label>
                      <p className="text-sm text-muted-foreground">Block all internet traffic if VPN disconnects</p>
                    </div>
                    <Switch id="killswitch" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="autoreconnect">Auto-reconnect</Label>
                      <p className="text-sm text-muted-foreground">Automatically reconnect if connection drops</p>
                    </div>
                    <Switch id="autoreconnect" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="connection-mode">Connection Mode</Label>
                    <Select defaultValue="recommended">
                      <SelectTrigger id="connection-mode">
                        <SelectValue placeholder="Select connection mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recommended">Recommended Server</SelectItem>
                        <SelectItem value="fastest">Fastest Server</SelectItem>
                        <SelectItem value="nearest">Nearest Server</SelectItem>
                        <SelectItem value="manual">Manual Selection</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure privacy and security options</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="dns-leak">DNS Leak Protection</Label>
                      <p className="text-sm text-muted-foreground">Prevent DNS requests from leaking outside the VPN tunnel</p>
                    </div>
                    <Switch id="dns-leak" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="webrtc">WebRTC Leak Protection</Label>
                      <p className="text-sm text-muted-foreground">Prevent WebRTC from exposing your real IP address</p>
                    </div>
                    <Switch id="webrtc" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="tracking">Block Tracking</Label>
                      <p className="text-sm text-muted-foreground">Block trackers and malicious websites</p>
                    </div>
                    <Switch id="tracking" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>Configure advanced VPN options</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="custom-dns">Custom DNS</Label>
                      <p className="text-sm text-muted-foreground">Use custom DNS servers</p>
                    </div>
                    <Switch id="custom-dns" />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="tcp-udp">Use TCP (instead of UDP)</Label>
                      <p className="text-sm text-muted-foreground">May help on restricted networks</p>
                    </div>
                    <Switch id="tcp-udp" />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="diagnostics">Send diagnostic data</Label>
                      <p className="text-sm text-muted-foreground">Help improve GhostRoute with anonymous data</p>
                    </div>
                    <Switch id="diagnostics" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default SettingsPage;
