import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="w-full max-w-4xl">
      <Card className="bg-card/80 backdrop-blur-sm border-border/50 rounded-xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none text-muted-foreground space-y-4">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>
            Welcome to QuantumQR! These Terms of Service ("Terms") govern your use of our website and services. By using our service, you agree to be bound by these Terms.
          </p>
          
          <h2 className="text-xl font-semibold text-foreground">1. Service Description</h2>
          <p>
            QuantumQR is a tool that allows users to generate QR codes and use AI-powered image editing tools. All processing is done client-side in your browser. No data is sent to our servers for these core functions.
          </p>

          <h2 className="text-xl font-semibold text-foreground">2. Privacy</h2>
          <p>
            Your privacy is paramount. As stated, your data for QR code generation and image editing does not leave your device. Please see our Privacy Policy for more details.
          </p>

          <h2 className="text-xl font-semibold text-foreground">3. User Conduct</h2>
          <p>
            You agree not to use our service to create content that is illegal, harmful, or violates the rights of others. You are solely responsible for the content you create and share using QuantumQR.
          </p>

          <h2 className="text-xl font-semibold text-foreground">4. Disclaimers and Limitation of Liability</h2>
          <p>
            This service is provided "as is" without any warranties. We are not liable for any damages arising from your use of this service. We do not guarantee the uptime or reliability of our service.
          </p>

          <h2 className="text-xl font-semibold text-foreground">5. Changes to Terms</h2>
          <p>
            We may modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page. Your continued use of the service after any such changes constitutes your acceptance of the new Terms.
          </p>

          <h2 className="text-xl font-semibold text-foreground">6. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at contact@quantumqr.example.com.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
