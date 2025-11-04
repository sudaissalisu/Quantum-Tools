"use client";

import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { useToast } from "@/hooks/use-toast";

type QRCodeDisplayProps = {
  value: string;
};

export function QRCodeDisplay({ value }: QRCodeDisplayProps) {
  const { toast } = useToast();

  const handleDownload = (format: 'png' | 'svg') => {
    try {
      if (format === 'svg') {
        const svgEl = document.getElementById("react-qrcode-svg");
        if (!svgEl) throw new Error("QR Code SVG element not found.");
        
        const svgData = new XMLSerializer().serializeToString(svgEl);
        const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        triggerDownload(url, "qrcode.svg");
        URL.revokeObjectURL(url);
      } else {
        const canvasEl = document.getElementById("react-qrcode-canvas") as HTMLCanvasElement | null;
        if (!canvasEl) throw new Error("QR Code Canvas element not found.");
        
        const url = canvasEl.toDataURL("image/png");
        triggerDownload(url, "qrcode.png");
      }
    } catch (error) {
      console.error("Download failed:", error);
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: "Could not prepare the QR code for download. Please try again.",
      });
    }
  };

  const triggerDownload = (url: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <Card className="sticky top-8">
      <CardContent className="p-6 flex flex-col items-center gap-6">
        <div className="bg-white p-4 rounded-lg shadow-inner">
          <QRCodeSVG id="react-qrcode-svg" value={value} size={256} level="Q" includeMargin={true} />
        </div>
        <div className="flex gap-4 w-full">
          <Button onClick={() => handleDownload('png')} className="flex-1 transition-transform hover:scale-105" variant="secondary">
            <Download className="mr-2 h-4 w-4" /> Download .png
          </Button>
          <Button onClick={() => handleDownload('svg')} className="flex-1 transition-transform hover:scale-105" variant="secondary">
            <Download className="mr-2 h-4 w-4" /> Download .svg
          </Button>
        </div>
        <div style={{ display: 'none' }}>
          <QRCodeCanvas id="react-qrcode-canvas" value={value} size={1024} level="Q" includeMargin={true} />
        </div>
      </CardContent>
    </Card>
  );
}
