import BackgroundRemover from "@/components/image-tools/background-remover";

export default function ImageToolsPage() {
  return (
    <>
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-gray-100 tracking-wide">
          AI Image Tools
        </h1>
        <p className="mt-4 text-sm text-cyan-400/80 max-w-2xl mx-auto">
          Powerful AI-driven tools to edit your images.
        </p>
      </header>
      <BackgroundRemover />
    </>
  );
}
