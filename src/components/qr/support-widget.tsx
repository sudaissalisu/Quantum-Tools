"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";
import Link from "next/link";

export function SupportWidget() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Coffee className="w-5 h-5 text-primary" />
          Enjoying QRGenius?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4">
          If you find this free, no-ads tool useful, please consider supporting its development.
        </CardDescription>
        <Button asChild className="w-full bg-primary/90 hover:bg-primary transition-colors">
          <Link href="https://www.buymeacoffee.com/example" target="_blank" rel="noopener noreferrer">
            <Coffee className="mr-2 h-4 w-4" /> Buy Me a Coffee
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
