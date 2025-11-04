import type {Metadata} from 'next';
import { Inter, Space_Mono } from 'next/font/google'
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/header';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
})

export const metadata: Metadata = {
  title: 'QuantumQR - The Privacy-First QR Code Generator',
  description: 'Generate QR codes instantly with a focus on privacy and a cutting-edge aesthetic. Your data never leaves your browser.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${spaceMono.variable}`}>
      <body className="font-body antialiased">
        <div className="min-h-screen bg-background text-gray-200 font-sans flex flex-col items-center justify-center p-4 overflow-hidden relative">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-950 to-black" />
            <div 
              className="absolute inset-[-200%] sm:inset-[-100%] lg:inset-[-50%] animate-[spin_20s_linear_infinite] 
                         bg-[conic-gradient(from_90deg_at_50%_50%,#8a63f7_0%,#4dd8f9_50%,#8a63f7_100%)] 
                         opacity-15"
            />
          </div>
          <Header />
          <main className="z-10 flex-grow container mx-auto px-4 py-8 md:py-12 flex flex-col items-center justify-center">
            {children}
          </main>
          <footer className="z-10 w-full py-6">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-center text-muted-foreground text-sm">
              <p>&copy; {new Date().getFullYear()} QuantumQR. All Rights Reserved.</p>
              <div className="flex gap-4 mt-4 sm:mt-0">
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </footer>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
