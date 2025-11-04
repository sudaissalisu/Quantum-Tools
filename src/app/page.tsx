import QRGenerator from '@/components/qr/qr-generator';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-black text-gray-200 font-sans flex flex-col items-center justify-center p-4">
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 flex flex-col items-center justify-center">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-gray-200 tracking-wide">
            QuantumQR
          </h1>
          <p className="mt-4 text-sm text-cyan-400/80 max-w-2xl mx-auto">
            Your data stays in your browser. Always.
          </p>
        </header>
        
        <QRGenerator />

      </main>
      <footer className="w-full py-6">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} QuantumQR. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
