'use client';

import QRGenerator from '@/components/qr/qr-generator';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

export default function Home() {

  return (
    <>
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-gray-100 tracking-wide">
          QuantumQR
        </h1>
        <p className="mt-4 text-sm text-cyan-400/80 max-w-2xl mx-auto">
          Your data stays in your browser. Always.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-6 flex items-center justify-center gap-3"
        >
          <div className="flex items-center gap-2 text-base font-medium bg-secondary/50 text-accent-foreground py-2 px-4 rounded-full border border-border/50">
            <TrendingUp className="text-primary h-5 w-5" />
            <span className="text-foreground/80">
              <span className="font-bold text-2xl text-foreground tracking-wider">17.3</span>
              <span className="font-bold text-2xl text-primary">K</span>
              <span className="font-bold text-2xl text-accent">+</span>
            </span>
            <span className="text-foreground/80">QR Codes Generated</span>
          </div>
        </motion.div>
      </header>
      
      <QRGenerator />
    </>
  );
}
