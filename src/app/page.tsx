'use client';

import { useState, useEffect } from 'react';
import QRGenerator from '@/components/qr/qr-generator';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

export default function Home() {
  const [generatedCount, setGeneratedCount] = useState(17277);

  useEffect(() => {
    // Increment the counter every 2.5 seconds for a more steady feel
    const interval = setInterval(() => {
      setGeneratedCount((prevCount) => prevCount + 1);
    }, 2500); // Update every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

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
          <div className="flex items-center gap-2 text-sm font-medium bg-secondary/50 text-accent-foreground py-2 px-4 rounded-full border border-border/50">
            <TrendingUp className="text-primary h-4 w-4" />
            <span className="text-foreground/80">Codes Generated:</span>
            <span className="font-bold text-lg text-primary tracking-wider">
              {generatedCount.toLocaleString()}
            </span>
          </div>
        </motion.div>
      </header>
      
      <QRGenerator />
    </>
  );
}
