"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, FileText, Wifi, User } from 'lucide-react';

import { UrlForm } from "./url-form";
import { TextForm } from "./text-form";
import { WifiForm, type WifiData } from "./wifi-form";
import { ContactForm, type VCardData } from "./contact-form";
import { QRCodeDisplay } from "./qr-code-display";
import { SupportWidget } from "./support-widget";

type TabValue = "url" | "text" | "wifi" | "contact";

export default function QRGenerator() {
  const [activeTab, setActiveTab] = useState<TabValue>("url");

  // State for each QR type
  const [url, setUrl] = useState("https://firebase.google.com/");
  const [text, setText] = useState("Hello from QuantumQR!");
  const [wifi, setWifi] = useState<WifiData>({ ssid: "", password: "", security: "WPA", hidden: false });
  const [vCard, setVCard] = useState<VCardData>({
    firstName: "", lastName: "", organization: "", title: "", phone: "", email: "", website: ""
  });

  const qrValue = useMemo(() => {
    switch (activeTab) {
      case "url":
        return url;
      case "text":
        return text;
      case "wifi":
        if (!wifi.ssid) return "WIFI:;";
        return `WIFI:S:${wifi.ssid};T:${wifi.security};P:${wifi.password};H:${wifi.hidden};;`;
      case "contact":
        const vCardParts = [
          "BEGIN:VCARD",
          "VERSION:3.0",
          `N:${vCard.lastName};${vCard.firstName}`,
          `FN:${vCard.firstName} ${vCard.lastName}`,
          vCard.organization && `ORG:${vCard.organization}`,
          vCard.title && `TITLE:${vCard.title}`,
          vCard.phone && `TEL;TYPE=WORK,VOICE:${vCard.phone}`,
          vCard.email && `EMAIL:${vCard.email}`,
          vCard.website && `URL:${vCard.website}`,
          "END:VCARD",
        ];
        return vCardParts.filter(Boolean).join("\n");
      default:
        return "";
    }
  }, [activeTab, url, text, wifi, vCard]);

  return (
    <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 w-full max-w-6xl">
      <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-700 rounded-xl shadow-2xl p-0">
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabValue)} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto bg-gray-900 rounded-lg p-1 text-gray-400">
              <TabsTrigger value="url" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white data-[state=active]:shadow-sm"><Link className="mr-2" />Link</TabsTrigger>
              <TabsTrigger value="text" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white data-[state=active]:shadow-sm"><FileText className="mr-2" />Text</TabsTrigger>
              <TabsTrigger value="wifi" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white data-[state=active]:shadow-sm"><Wifi className="mr-2" />Wi-Fi</TabsTrigger>
              <TabsTrigger value="contact" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white data-[state=active]:shadow-sm"><User className="mr-2" />Contact</TabsTrigger>
            </TabsList>
            <div className="mt-6">
              <TabsContent value="url"><UrlForm url={url} setUrl={setUrl} /></TabsContent>
              <TabsContent value="text"><TextForm text={text} setText={setText} /></TabsContent>
              <TabsContent value="wifi"><WifiForm wifi={wifi} setWifi={setWifi} /></TabsContent>
              <TabsContent value="contact"><ContactForm vCard={vCard} setVCard={setVCard} /></TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <QRCodeDisplay value={qrValue} />
        <SupportWidget />
      </div>
    </div>
  );
}
