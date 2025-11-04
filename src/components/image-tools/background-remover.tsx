'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, Loader2 } from 'lucide-react';
import { removeBackground } from '@/ai/flows/remove-background-flow';
import Image from 'next/image';

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default function BackgroundRemover() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        toast({
          variant: 'destructive',
          title: 'Invalid File Type',
          description: `Please upload a valid image file (${ALLOWED_IMAGE_TYPES.join(', ')}).`,
        });
        return;
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        toast({
          variant: 'destructive',
          title: 'File Too Large',
          description: `Please upload an image smaller than ${MAX_FILE_SIZE_MB}MB.`,
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage(reader.result as string);
        setProcessedImage(null); // Reset processed image on new upload
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveBackground = async () => {
    if (!originalImage) {
      toast({
        variant: 'destructive',
        title: 'No Image',
        description: 'Please upload an image first.',
      });
      return;
    }
    setIsLoading(true);
    setProcessedImage(null);
    try {
      const result = await removeBackground({ image: originalImage });
      setProcessedImage(result.image);
      toast({
        title: 'Success!',
        description: 'Background removed successfully.',
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: 'Could not remove background. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'image-no-bg.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="bg-card/80 backdrop-blur-sm border-border/50 rounded-xl shadow-2xl">
        <CardHeader>
          <CardTitle>Remove Background</CardTitle>
          <CardDescription>Upload an image to remove its background using AI.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="image-upload" className="block text-sm font-medium text-gray-300">
              Upload Image
            </label>
            <div className="flex items-center gap-2">
              <Input
                id="image-upload"
                type="file"
                accept={ALLOWED_IMAGE_TYPES.join(',')}
                onChange={handleImageUpload}
                className="file:text-primary-foreground"
                disabled={isLoading}
              />
            </div>
             <p className="text-xs text-muted-foreground">Max file size: {MAX_FILE_SIZE_MB}MB. Supported formats: JPG, PNG, WebP.</p>
          </div>
          <Button onClick={handleRemoveBackground} disabled={!originalImage || isLoading} className="w-full">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Bot className="mr-2 h-4 w-4" />
            )}
            {isLoading ? 'Processing...' : 'Remove Background'}
          </Button>
        </CardContent>
      </Card>
      
      <Card className="bg-card/80 backdrop-blur-sm border-border/50 rounded-xl shadow-2xl flex flex-col">
        <CardHeader>
          <CardTitle>Result</CardTitle>
          <CardDescription>The processed image will appear here.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center p-4">
          {processedImage ? (
            <Image src={processedImage} alt="Processed image" width={400} height={400} className="rounded-md object-contain max-h-full max-w-full" />
          ) : originalImage ? (
             <Image src={originalImage} alt="Original image" width={400} height={400} className="rounded-md object-contain max-h-full max-w-full" />
          ) : (
            <div className="w-full h-64 border-2 border-dashed border-border/50 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Your image will be shown here</p>
            </div>
          )}
        </CardContent>
        {processedImage && (
          <CardFooter>
            <Button onClick={handleDownload} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Image
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
