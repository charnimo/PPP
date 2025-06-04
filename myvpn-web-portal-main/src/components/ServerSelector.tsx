import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Globe } from "lucide-react";

interface Server {
  name: string;
  ip: string;
  location: string;
}

interface ServerSelectorProps {
  onServerSelect: (server: Server) => void;
  selectedServer: Server;
}

const ServerSelector = ({ onServerSelect, selectedServer }: ServerSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const servers: Server[] = [
    {
      name: "Server 1",
      ip: "128.85.43.221",
      location: "New York, US"
    },
    {
      name: "Server 2", 
      ip: "4.251.118.138", // Replace with your actual second server IP
      location: "London, UK"
    }
  ];
  
  const filteredServers = servers.filter(server =>
    server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    server.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    server.ip.includes(searchQuery)
  );
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Globe className="h-5 w-5 text-primary" />
          <CardTitle>Server Locations</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input 
            placeholder="Search server locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-2"
          />
          
          <ScrollArea className="h-[280px] pr-4">
            <RadioGroup
              value={selectedServer.ip}
              onValueChange={(value) => {
                const server = servers.find(s => s.ip === value);
                if (server) onServerSelect(server);
              }}
              className="space-y-2"
            >
              {filteredServers.map(server => (
                <div 
                  key={server.ip} 
                  className={`flex items-center space-x-2 rounded-md border p-3 transition-colors ${
                    selectedServer.ip === server.ip 
                      ? 'border-primary bg-primary/5' 
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <RadioGroupItem value={server.ip} id={server.ip} />
                  <Label htmlFor={server.ip} className="flex-grow cursor-pointer">
                    <div className="flex flex-col">
                      <span className="font-medium">{server.name}</span>
                      <span className="text-sm text-muted-foreground">{server.location}</span>
                      <span className="text-xs text-muted-foreground">{server.ip}</span>
                    </div>
                  </Label>
                </div>
              ))}
              
              {filteredServers.length === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  No servers found matching "{searchQuery}"
                </div>
              )}
            </RadioGroup>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServerSelector;
