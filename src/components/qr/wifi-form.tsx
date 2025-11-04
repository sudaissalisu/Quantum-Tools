"use client";

import type { Dispatch, SetStateAction } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface WifiData {
  ssid: string;
  password: string;
  security: "WPA" | "WEP" | "nopass";
  hidden: boolean;
}

type WifiFormProps = {
  wifi: WifiData;
  setWifi: Dispatch<SetStateAction<WifiData>>;
};

export function WifiForm({ wifi, setWifi }: WifiFormProps) {
  const handleChange = (field: keyof WifiData, value: string | boolean) => {
    setWifi((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="ssid">Network Name (SSID)</Label>
        <Input id="ssid" value={wifi.ssid} onChange={(e) => handleChange("ssid", e.target.value)} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="security">Security</Label>
          <Select
            value={wifi.security}
            onValueChange={(value: WifiData["security"]) => handleChange("security", value)}
          >
            <SelectTrigger id="security">
              <SelectValue placeholder="Select security type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="WPA">WPA/WPA2</SelectItem>
              <SelectItem value="WEP">WEP</SelectItem>
              <SelectItem value="nopass">None</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            type="password" 
            value={wifi.password} 
            onChange={(e) => handleChange("password", e.target.value)}
            disabled={wifi.security === 'nopass'}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2 pt-2">
        <Checkbox id="hidden" checked={wifi.hidden} onCheckedChange={(checked) => handleChange("hidden", !!checked)} />
        <Label htmlFor="hidden">Hidden Network</Label>
      </div>
    </div>
  );
}
