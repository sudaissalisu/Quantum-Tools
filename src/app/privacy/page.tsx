import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="w-full max-w-4xl">
      <Card className="bg-card/80 backdrop-blur-sm border-border/50 rounded-xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none text-muted-foreground space-y-4">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>
            At QuantumQR, we are committed to protecting your privacy. This Privacy Policy explains how we handle your information.
          </p>
          
          <h2 className="text-xl font-semibold text-foreground">1. Information We Do Not Collect</h2>
          <p>
            Our core services, QR Code Generation and AI Background Removal, are designed with privacy as a fundamental principle.
          </p>
          <ul>
            <li><strong>QR Code Data:</strong> All data you enter to generate a QR code (URLs, text, contact information, etc.) is processed exclusively within your web browser. This data is never sent to, stored on, or processed by our servers.</li>
            <li><strong>Image Data:</strong> Images you upload for background removal are processed directly on your device using in-browser AI. Your images are never uploaded to our servers.</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground">2. Information We May Collect</h2>
          <p>
            We may collect anonymous usage data for the sole purpose of improving our service. This may include information like browser type, page visits, and feature usage. This data is aggregated and cannot be used to personally identify you. We do not use third-party tracking cookies for advertising purposes.
          </p>

          <h2 className="text-xl font-semibold text-foreground">3. How We Use Information</h2>
          <p>
            Any information we collect is used solely for internal purposes, such as analyzing usage patterns to improve application performance and user experience.
          </p>

          <h2 className="text-xl font-semibold text-foreground">4. Third-Party Services</h2>
          <p>
            The background removal tool may download model files from a third-party content delivery network (CDN) to your browser. This is a one-time download that is cached by your browser for future use. No personal data is shared with this CDN.
          </p>

          <h2 className="text-xl font-semibold text-foreground">5. Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>

          <h2 className="text-xl font-semibold text-foreground">6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@quantumqr.example.com.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
