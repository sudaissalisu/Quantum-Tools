"use client";

import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download, Atom } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

type QRCodeDisplayProps = {
  value: string;
};

const QR_CODE_CONFIG = {
  size: 256,
  level: "Q",
  includeMargin: true,
  bgColor: "#ffffff",
  fgColor: "#0A0A0B", // Almost black, matching the background
  imageSettings: {
    src: "/icon.svg",
    height: 48,
    width: 48,
    excavate: true,
  },
};

const QR_CODE_DOWNLOAD_CONFIG = {
  ...QR_CODE_CONFIG,
  size: 1024,
};


export function QRCodeDisplay({ value }: QRCodeDisplayProps) {
  const { toast } = useToast();

  const handleDownload = (format: 'png' | 'svg') => {
    try {
      if (format === 'svg') {
        const svgEl = document.getElementById("react-qrcode-svg");
        if (!svgEl) throw new Error("QR Code SVG element not found.");
        
        // Add a title to the SVG for accessibility
        const titleEl = document.createElementNS("http://www.w3.org/2000/svg", "title");
        titleEl.textContent = "QuantumQR Code";
        svgEl.insertBefore(titleEl, svgEl.firstChild);

        const svgData = new XMLSerializer().serializeToString(svgEl);
        const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-t" });
        const url = URL.createObjectURL(blob);
        triggerDownload(url, "quantum-qrcode.svg");
        URL.revokeObjectURL(url);
      } else {
        const canvasEl = document.getElementById("react-qrcode-canvas") as HTMLCanvasElement | null;
        if (!canvasEl) throw new Error("QR Code Canvas element not found.");
        
        const url = canvasEl.toDataURL("image/png");
        triggerDownload(url, "quantum-qrcode.png");
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
    <Card className="sticky top-8 bg-gray-900/60 backdrop-blur-sm border-gray-700 rounded-xl shadow-2xl">
      <CardContent className="p-6 flex flex-col items-center gap-6">
        <motion.div
          key={value}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-4 rounded-lg shadow-inner"
        >
          <QRCodeSVG id="react-qrcode-svg" {...QR_CODE_CONFIG} value={value} />
        </motion.div>
        <div className="flex gap-4 w-full">
          <Button onClick={() => handleDownload('png')} className="flex-1 bg-primary/90 text-primary-foreground hover:bg-primary transition-transform hover:scale-105">
            <Download className="mr-2 h-4 w-4" /> Download .png
          </Button>
          <Button onClick={() => handleDownload('svg')} className="flex-1 bg-primary/90 text-primary-foreground hover:bg-primary transition-transform hover:scale-105">
            <Download className="mr-2 h-4 w-4" /> Download .svg
          </Button>
        </div>
        <div style={{ display: 'none' }}>
          <QRCodeCanvas id="react-qrcode-canvas" {...QR_CODE_DOWNLOAD_CONFIG} value={value} />
        </div>
      </CardContent>
    </Card>
  );
}
