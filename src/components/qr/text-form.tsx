"use client";

import type { Dispatch, SetStateAction } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type TextFormProps = {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
};

export function TextForm({ text, setText }: TextFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="text">Your Text</Label>
        <Textarea
          id="text"
          placeholder="Enter any text you want to encode..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
        />
      </div>
    </div>
  );
}
