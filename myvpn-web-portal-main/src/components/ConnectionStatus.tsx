
import { Badge } from "@/components/ui/badge";

interface ConnectionStatusProps {
  status: "connected" | "disconnected" | "connecting";
}

const ConnectionStatus = ({ status }: ConnectionStatusProps) => {
  return (
    <Badge 
      variant="outline" 
      className={`
        px-3 py-1 
        ${status === "connected" ? "bg-green-50 text-green-700 border-green-200" : 
          status === "connecting" ? "bg-yellow-50 text-yellow-700 border-yellow-200" : 
          "bg-red-50 text-red-700 border-red-200"}
      `}
    >
      <span className={`connection-dot ${status} mr-2`}></span>
      {status === "connected" ? "Connected" : 
       status === "connecting" ? "Connecting..." : "Disconnected"}
    </Badge>
  );
};

export default ConnectionStatus;
