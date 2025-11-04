"use client";

import type { Dispatch, SetStateAction } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { DotType } from "qr-code-styling";

export interface StyleData {
  dotType: DotType;
}

type StyleFormProps = {
  style: StyleData;
  setStyle: Dispatch<SetStateAction<StyleData>>;
};

export function StyleForm({ style, setStyle }: StyleFormProps) {
  const handleChange = (field: keyof StyleData, value: string) => {
    setStyle((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4">
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
      <p className="text-sm text-muted-foreground">
        More styling options coming soon!
      </p>
    </div>
  );
}
