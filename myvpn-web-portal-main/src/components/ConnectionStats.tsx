import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

// Measure real network performance
async function estimateNetworkPerformance(): Promise<{
  pingMs: number;
  downloadSpeedMbps: number;
  uploadSpeedMbps: number;
}> {
  const pingStart = performance.now();
  await fetch("https://www.google.com/", { method: "HEAD", mode: "no-cors" });
  const pingEnd = performance.now();
  const pingMs = pingEnd - pingStart;

  const downloadStart = performance.now();
  await fetch("https://httpbin.org/bytes/100000"); // 1 MB download
  const downloadEnd = performance.now();
  const downloadTimeSec = (downloadEnd - downloadStart) / 1000;
  const downloadSpeedMbps = (1 * 8) / downloadTimeSec;

  const payload = new Uint8Array(100000); // 1 MB upload
  const uploadStart = performance.now();
  await fetch("https://httpbin.org/post", {
    method: "POST",
    body: payload,
    headers: { "Content-Type": "application/octet-stream" },
  });
  const uploadEnd = performance.now();
  const uploadTimeSec = (uploadEnd - uploadStart) / 1000;
  const uploadSpeedMbps = (1 * 8) / uploadTimeSec;

  return {
    pingMs,
    downloadSpeedMbps,
    uploadSpeedMbps,
  };
}

const ConnectionStats = () => {
  const [uptime, setUptime] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [ping, setPing] = useState(0);

  useEffect(() => {
    const uptimeInterval = setInterval(() => {
      setUptime(prev => prev + 1);
    }, 1000);

    const statsInterval = setInterval(async () => {
      try {
        const { pingMs, downloadSpeedMbps, uploadSpeedMbps } = await estimateNetworkPerformance();
        setPing(Math.round(pingMs));
        setDownloadSpeed(downloadSpeedMbps);
        setUploadSpeed(uploadSpeedMbps);
      } catch (err) {
        console.error("Network test failed:", err);
      }
    }, 1000); // every 10 seconds

    return () => {
      clearInterval(uptimeInterval);
      clearInterval(statsInterval);
    };
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
            <span className="text-sm font-medium">{downloadSpeed.toFixed(2)} Mbps</span>
            <Progress value={(downloadSpeed / 100) * 100} className="w-24 h-2" />
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-1">Upload</p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{uploadSpeed.toFixed(2)} Mbps</span>
            <Progress value={(uploadSpeed / 100) * 100} className="w-24 h-2" />
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
