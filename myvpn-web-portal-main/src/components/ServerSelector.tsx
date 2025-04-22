
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Globe } from "lucide-react";

interface ServerSelectorProps {
  onServerSelect: (server: string) => void;
  selectedServer: string;
}

const ServerSelector = ({ onServerSelect, selectedServer }: ServerSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const servers = [
    "New York, US",
    "Los Angeles, US",
    "Chicago, US",
    "Toronto, CA",
    "London, UK",
    "Amsterdam, NL",
    "Frankfurt, DE",
    "Paris, FR",
    "Tokyo, JP",
    "Singapore, SG",
    "Sydney, AU",
  ];
  
  const filteredServers = servers.filter(server => 
    server.toLowerCase().includes(searchQuery.toLowerCase())
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
              value={selectedServer} 
              onValueChange={onServerSelect}
              className="space-y-2"
            >
              {filteredServers.map(server => (
                <div key={server} className={`flex items-center space-x-2 rounded-md border p-3 transition-colors ${selectedServer === server ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'}`}>
                  <RadioGroupItem value={server} id={server} />
                  <Label htmlFor={server} className="flex-grow cursor-pointer">{server}</Label>
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
