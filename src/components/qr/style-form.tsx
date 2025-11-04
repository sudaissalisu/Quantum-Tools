"use client";

import type { Dispatch, SetStateAction } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { DotType } from "qr-code-styling";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export interface StyleData {
  dotType: DotType;
  logo?: string;
  logoShape: 'square' | 'round';
}

type StyleFormProps = {
  style: StyleData;
  setStyle: Dispatch<SetStateAction<StyleData>>;
};

export function StyleForm({ style, setStyle }: StyleFormProps) {
  const handleChange = (field: keyof StyleData, value: any) => {
    setStyle((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange("logo", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">QR Pattern</h3>
        <div className="space-y-2">
          <Label htmlFor="dotType">Dot Style</Label>
          <Select
            value={style.dotType}
            onValueChange={(value: DotType) => handleChange("dotType", value)}
          >
            <SelectTrigger id="dotType">
              <SelectValue placeholder="Select dot style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="square">Square</SelectItem>
              <SelectItem value="dots">Dots</SelectItem>
              <SelectItem value="rounded">Rounded</SelectItem>
              <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
              <SelectItem value="classy">Classy</SelectItem>
              <SelectItem value="classy-rounded">Classy Rounded</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Logo</h3>
        <div className="space-y-2">
          <Label htmlFor="logo-upload">Upload Logo</Label>
          <Input id="logo-upload" type="file" accept="image/*" onChange={handleLogoUpload} className="file:text-primary-foreground" />
          <p className="text-xs text-muted-foreground">Recommended: Square image, &lt; 500KB.</p>
        </div>
        
        {style.logo && (
          <div className="space-y-2">
            <Label>Logo Shape</Label>
            <RadioGroup
              defaultValue="square"
              className="flex items-center gap-4"
              value={style.logoShape}
              onValueChange={(value: 'square' | 'round') => handleChange('logoShape', value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="square" id="square" />
                <Label htmlFor="square">Square</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="round" id="round" />
                <Label htmlFor="round">Round</Label>
              </div>
            </RadioGroup>
          </div>
        )}
      </div>

      <p className="text-sm text-muted-foreground pt-4">
        More styling options coming soon!
      </p>
    </div>
  );
}
