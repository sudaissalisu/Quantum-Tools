"use client";

import type { Dispatch, SetStateAction } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type UrlFormProps = {
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
};

export function UrlForm({ url, setUrl }: UrlFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="url">Website URL</Label>
        <Input
          id="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          type="url"
        />
      </div>
    </div>
  );
}
