"use client";

import type { Dispatch, SetStateAction } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { CornerDotType, CornerSquareType, DotType } from "qr-code-styling";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export interface StyleData {
  dotType: DotType;
  cornerSquareType: CornerSquareType;
  cornerDotType: CornerDotType;
  dotsColor: string;
  cornersColor: string;
  backgroundColor: string;
  logo?: string;
  logoShape: 'square' | 'round';
}

type StyleFormProps = {
  style: StyleData;
  setStyle: Dispatch<SetStateAction<StyleData>>;
};

const MAX_FILE_SIZE_MB = 3;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/svg+xml", "image/webp"];

const ColorPickerInput = ({ label, value, onChange }: { label: string, value: string, onChange: (value: string) => void }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-2">
        <Input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="h-10 w-12 p-1" />
        <Input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    </div>
  );

export function StyleForm({ style, setStyle }: StyleFormProps) {
  const { toast } = useToast();
  const [useCustomLogo, setUseCustomLogo] = useState(!!style.logo);

  const handleChange = (field: keyof StyleData, value: any) => {
    setStyle((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogoToggle = (checked: boolean) => {
    setUseCustomLogo(checked);
    if (!checked) {
      // Clear logo when toggled off
      handleChange("logo", undefined);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        toast({
          variant: "destructive",
          title: "Invalid File Type",
          description: `Please upload a valid image file (${ALLOWED_IMAGE_TYPES.join(", ")}).`,
        });
        return;
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        toast({
          variant: "destructive",
          title: "File Too Large",
          description: `Please upload an image smaller than ${MAX_FILE_SIZE_MB}MB.`,
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange("logo", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Pattern</h3>
        <div className="space-y-2">
          <Label htmlFor="dotType">Dot Style</Label>
          <Select value={style.dotType} onValueChange={(value: DotType) => handleChange("dotType", value)}>
            <SelectTrigger id="dotType"><SelectValue placeholder="Select dot style" /></SelectTrigger>
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

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Corners</h3>
        <div className="space-y-2">
            <Label htmlFor="cornerSquareType">Corner Square</Label>
            <Select value={style.cornerSquareType} onValueChange={(value: CornerSquareType) => handleChange("cornerSquareType", value)}>
                <SelectTrigger id="cornerSquareType"><SelectValue placeholder="Select corner style" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="square">Square</SelectItem>
                    <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
                    <SelectItem value="dot">Dot</SelectItem>
                </SelectContent>
            </Select>
        </div>
         <div className="space-y-2">
            <Label htmlFor="cornerDotType">Corner Dot</Label>
            <Select value={style.cornerDotType} onValueChange={(value: CornerDotType) => handleChange("cornerDotType", value)}>
                <SelectTrigger id="cornerDotType"><SelectValue placeholder="Select corner dot style" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="square">Square</SelectItem>
                    <SelectItem value="dot">Dot</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Colors</h3>
        <ColorPickerInput label="Dots" value={style.dotsColor} onChange={(value) => handleChange('dotsColor', value)} />
        <ColorPickerInput label="Corners" value={style.cornersColor} onChange={(value) => handleChange('cornersColor', value)} />
        <ColorPickerInput label="Background" value={style.backgroundColor} onChange={(value) => handleChange('backgroundColor', value)} />
      </div>


      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Logo</h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="custom-logo-switch">Use Custom Logo</Label>
          <Switch id="custom-logo-switch" checked={useCustomLogo} onCheckedChange={handleLogoToggle} />
        </div>

        {useCustomLogo && (
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="logo-upload">Upload Logo</Label>
              <Input id="logo-upload" type="file" accept={ALLOWED_IMAGE_TYPES.join(",")} onChange={handleLogoUpload} className="file:text-primary-foreground" />
              <p className="text-xs text-muted-foreground">Recommended: Square image, &lt; 3MB.</p>
            </div>
            
            {style.logo && (
              <div className="space-y-2">
                <Label>Logo Shape</Label>
                <RadioGroup defaultValue="square" className="flex items-center gap-4" value={style.logoShape} onValueChange={(value: 'square' | 'round') => handleChange('logoShape', value)}>
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
        )}
      </div>
    </div>
  );
}