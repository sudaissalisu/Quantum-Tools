import QRGenerator from '@/components/qr/qr-generator';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
            QRGenius
          </h1>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            A simple, fast, and privacy-focused tool to generate QR codes for free. Your data never leaves your browser.
          </p>
        </header>
        
        <QRGenerator />

      </main>
      <footer className="w-full py-6">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} QRGenius. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
