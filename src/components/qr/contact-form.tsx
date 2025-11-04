"use client";

import type { Dispatch, SetStateAction } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export interface VCardData {
  firstName: string;
  lastName: string;
  organization: string;
  title: string;
  phone: string;
  email: string;
  website: string;
}

type ContactFormProps = {
  vCard: VCardData;
  setVCard: Dispatch<SetStateAction<VCardData>>;
};

export function ContactForm({ vCard, setVCard }: ContactFormProps) {
  const handleChange = (field: keyof VCardData, value: string) => {
    setVCard((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" value={vCard.firstName} onChange={(e) => handleChange("firstName", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" value={vCard.lastName} onChange={(e) => handleChange("lastName", e.target.value)} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="organization">Organization</Label>
        <Input id="organization" value={vCard.organization} onChange={(e) => handleChange("organization", e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={vCard.title} onChange={(e) => handleChange("title", e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" type="tel" value={vCard.phone} onChange={(e) => handleChange("phone", e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={vCard.email} onChange={(e) => handleChange("email", e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input id="website" type="url" value={vCard.website} onChange={(e) => handleChange("website", e.target.value)} />
      </div>
    </div>
  );
}
