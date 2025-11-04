
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { QrCode, Scan } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "QR Generator", icon: QrCode },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="z-20 w-full">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold font-headline text-gray-100">
          <Scan size={28} className="text-primary" />
          Quantum
        </Link>
        <div className="flex items-center gap-4">
          <nav className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-lg p-2">
            <ul className="flex items-center gap-2">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                      pathname === href
                        ? "bg-primary/90 text-primary-foreground shadow-lg"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    )}
                  >
                    <Icon size={16} />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <a 
            href="https://www.buymeacoffee.com/sudaissalisu" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:block"
          >
            <img 
              src="https://img.buymeacoffee.com/button-api/?text=Buy Me a Coffee&emoji=🥤&slug=sudaissalisu&button_colour=FFDD00&font_colour=000000&font_family=Inter&outline_colour=000000&coffee_colour=FFDD00" 
              alt="Buy Me a Coffee"
              className="rounded-lg shadow-lg hover:scale-105 transition-transform"
            />
          </a>
        </div>
      </div>
    </header>
  );
}
