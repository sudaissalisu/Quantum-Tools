"use client";

import { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import type { StyleData } from './style-form';

type QRCodeDisplayProps = {
  value: string;
  style: StyleData;
};

const QR_CODE_CONFIG = {
  width: 256,
  height: 256,
  margin: 5,
  image: "/icon.svg",
  dotsOptions: {
    color: "#4dd8f9", // Electric Blue/Cyan
    type: "rounded" as const,
  },
  backgroundOptions: {
    color: "#00000000", // Transparent
  },
  imageOptions: {
    imageSize: 0.4,
    margin: 4,
  },
  cornersSquareOptions: {
    color: "#8a63f7", // Vibrant Purple
    type: "extra-rounded" as const,
  },
  cornersDotOptions: {
    color: "#8a63f7",
  },
};

export function QRCodeDisplay({ value, style }: QRCodeDisplayProps) {
  const [qrCode] = useState(new QRCodeStyling(QR_CODE_CONFIG));
  const ref = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, [qrCode, ref]);

  useEffect(() => {
    qrCode.update({
      data: value,
      dotsOptions: { ...QR_CODE_CONFIG.dotsOptions, type: style.dotType },
    });
  }, [value, style, qrCode]);


  const handleDownload = async (format: 'png' | 'svg') => {
    try {
      await qrCode.download({
        name: "quantum-qrcode",
        extension: format,
      });
    } catch (error) {
      console.error("Download failed:", error);
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: "Could not prepare the QR code for download. Please try again.",
      });
    }
  };

  return (
    <Card className="sticky top-8 bg-card/80 backdrop-blur-sm border-border/50 rounded-xl shadow-2xl">
      <CardContent className="p-6 flex flex-col items-center gap-6">
        <motion.div
          key={value + style.dotType}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-background p-4 rounded-lg shadow-inner"
        >
          <div ref={ref} />
        </motion.div>
        <div className="flex gap-4 w-full">
          <Button onClick={() => handleDownload('png')} className="flex-1 bg-primary/90 text-primary-foreground hover:bg-primary transition-transform hover:scale-105">
            <Download className="mr-2 h-4 w-4" /> Download .png
          </Button>
          <Button onClick={() => handleDownload('svg')} className="flex-1 bg-primary/90 text-primary-foreground hover:bg-primary transition-transform hover:scale-105">
            <Download className="mr-2 h-4 w-4" /> Download .svg
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
