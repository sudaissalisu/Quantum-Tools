"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, FileText, Wifi, User, Brush } from 'lucide-react';

import { UrlForm } from "./url-form";
import { TextForm } from "./text-form";
import { WifiForm, type WifiData } from "./wifi-form";
import { ContactForm, type VCardData } from "./contact-form";
import { StyleForm, type StyleData } from "./style-form";
import { QRCodeDisplay } from "./qr-code-display";
import { SupportWidget } from "./support-widget";

type TabValue = "url" | "text" | "wifi" | "contact" | "style";

export default function QRGenerator() {
  const [activeTab, setActiveTab] = useState<TabValue>("url");

  // State for each QR type
  const [url, setUrl] = useState("https://firebase.google.com/");
  const [text, setText] = useState("Hello from QuantumQR!");
  const [wifi, setWifi] = useState<WifiData>({ ssid: "", password: "", security: "WPA", hidden: false });
  const [vCard, setVCard] = useState<VCardData>({
    firstName: "", lastName: "", organization: "", title: "", phone: "", email: "", website: ""
  });
  const [style, setStyle] = useState<StyleData>({ dotType: 'rounded' });


  const qrValue = useMemo(() => {
    switch (activeTab) {
      case "url":
      case "style": // Fallthrough to use URL when on style tab
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
        // This should be unreachable if all tabs are handled
        return url; 
    }
  }, [activeTab, url, text, wifi, vCard]);

  const displayValue = useMemo(() => {
    // If the style tab is active, we need to show a QR code for another data type.
    // Let's create a priority list for which data to show.
    if (activeTab === 'style') {
        if(url) return url;
        if(text) return text;
        if(wifi.ssid) return `WIFI:S:${wifi.ssid};T:${wifi.security};P:${wifi.password};H:${wifi.hidden};;`;
        if(vCard.firstName || vCard.lastName) {
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
        }
        // Fallback to url if all else is empty
        return url;
    }
    return qrValue;
  }, [activeTab, qrValue, url, text, wifi, vCard]);


  return (
    <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 w-full max-w-6xl">
      <Card className="bg-card/80 backdrop-blur-sm border-border/50 rounded-xl shadow-2xl p-0">
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabValue)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 h-auto bg-secondary/80 rounded-lg p-1 text-muted-foreground">
              <TabsTrigger value="url" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"><Link className="mr-2" />Link</TabsTrigger>
              <TabsTrigger value="text" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"><FileText className="mr-2" />Text</TabsTrigger>
              <TabsTrigger value="wifi" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"><Wifi className="mr-2" />Wi-Fi</TabsTrigger>
              <TabsTrigger value="contact" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"><User className="mr-2" />Contact</TabsTrigger>
              <TabsTrigger value="style" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"><Brush className="mr-2" />Style</TabsTrigger>
            </TabsList>
            <div className="mt-6">
              <TabsContent value="url"><UrlForm url={url} setUrl={setUrl} /></TabsContent>
              <TabsContent value="text"><TextForm text={text} setText={setText} /></TabsContent>
              <TabsContent value="wifi"><WifiForm wifi={wifi} setWifi={setWifi} /></TabsContent>
              <TabsContent value="contact"><ContactForm vCard={vCard} setVCard={setVCard} /></TabsContent>
              <TabsContent value="style"><StyleForm style={style} setStyle={setStyle} /></TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <QRCodeDisplay value={displayValue} style={style} />
        <SupportWidget />
      </div>
    </div>
  );
}
