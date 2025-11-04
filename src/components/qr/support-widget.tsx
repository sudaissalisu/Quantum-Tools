"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";
import Link from "next/link";

export function SupportWidget() {
  return (
    <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-700 rounded-xl shadow-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg text-gray-200">
          <Coffee className="w-5 h-5 text-accent" />
          Enjoying QuantumQR?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4 text-gray-400">
          If you find this free, privacy-first tool useful, please consider supporting its development.
        </CardDescription>
        <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <Link href="https://www.buymeacoffee.com/example" target="_blank" rel="noopener noreferrer">
            <Coffee className="mr-2 h-4 w-4" /> Buy Me a Coffee
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
