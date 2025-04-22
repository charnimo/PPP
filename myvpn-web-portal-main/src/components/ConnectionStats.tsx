
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

const ConnectionStats = () => {
  const [uptime, setUptime] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [ping, setPing] = useState(0);
  
  useEffect(() => {
    // Simulate real-time statistics
    const interval = setInterval(() => {
      setUptime(prev => prev + 1);
      setDownloadSpeed(Math.floor(Math.random() * 10) + 5); // 5-15 MB/s
      setUploadSpeed(Math.floor(Math.random() * 5) + 2); // 2-7 MB/s
      setPing(Math.floor(Math.random() * 20) + 20); // 20-40ms
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="space-y-4 bg-muted/30 p-4 rounded-lg">
      <h3 className="font-medium text-sm">Connection Statistics</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Download</p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{downloadSpeed} MB/s</span>
            <Progress value={(downloadSpeed / 15) * 100} className="w-24 h-2" />
          </div>
        </div>
        
        <div>
          <p className="text-xs text-muted-foreground mb-1">Upload</p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{uploadSpeed} MB/s</span>
            <Progress value={(uploadSpeed / 7) * 100} className="w-24 h-2" />
          </div>
        </div>
        
        <div>
          <p className="text-xs text-muted-foreground mb-1">Ping</p>
          <span className="text-sm font-medium">{ping} ms</span>
        </div>
        
        <div>
          <p className="text-xs text-muted-foreground mb-1">Connected for</p>
          <span className="text-sm font-medium">{formatUptime(uptime)}</span>
        </div>
      </div>
    </div>
  );
};

export default ConnectionStats;
