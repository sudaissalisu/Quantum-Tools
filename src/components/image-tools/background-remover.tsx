'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, Loader2, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { removeBackground } from '@imgly/background-removal';
import { Progress } from '@/components/ui/progress';

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default function BackgroundRemover() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        toast({
          variant: 'destructive',
          title: 'Invalid File Type',
          description: `Please upload a valid image file (${ALLOWED_IMAGE_TYPES.map(t => t.split('/')[1]).join(', ')}).`,
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
    setProgress(0);

    try {
      const resultBlob = await removeBackground(originalImage, {
        publicPath: 'https://unpkg.com/@imgly/background-removal@1.4.1/assets/imgly/',
        progress: (key, current, total) => {
          const progress = (current / total) * 100;
          setProgress(progress);
        },
      });
      const resultUrl = URL.createObjectURL(resultBlob);
      setProcessedImage(resultUrl);
      toast({
        title: 'Success!',
        description: 'Background removed successfully.',
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: 'Could not remove background. The model may have failed to load or the image is unsupported.',
      });
    } finally {
      setIsLoading(false);
      setProgress(100);
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

  const getLoadingMessage = () => {
    if (progress < 100) {
      if (progress === 0) {
        return 'Initializing model...';
      }
      return `Downloading model: ${Math.round(progress)}%`;
    }
    return 'Processing image...';
  };

  return (
    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="bg-card/80 backdrop-blur-sm border-border/50 rounded-xl shadow-2xl">
        <CardHeader>
          <CardTitle>In-Browser Background Removal</CardTitle>
          <CardDescription>Your image is processed locally and never leaves your device.</CardDescription>
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
             <p className="text-xs text-muted-foreground">Max file size: {MAX_FILE_SIZE_MB}MB. Formats: JPG, PNG, WebP.</p>
          </div>
          <Button onClick={handleRemoveBackground} disabled={!originalImage || isLoading} className="w-full">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <ImageIcon className="mr-2 h-4 w-4" />
            )}
            {isLoading ? getLoadingMessage() : 'Remove Background'}
          </Button>
          {isLoading && <Progress value={progress} className="w-full h-2" />}
        </CardContent>
      </Card>
      
      <Card className="bg-card/80 backdrop-blur-sm border-border/50 rounded-xl shadow-2xl flex flex-col">
        <CardHeader>
          <CardTitle>Result</CardTitle>
          <CardDescription>The processed image will appear here.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center p-4">
           <div 
            className="w-full h-full min-h-64 rounded-lg flex items-center justify-center"
            style={{ 
              backgroundImage: 'repeating-conic-gradient(from 0deg, #1A1A1A 0 25%, #2A2A2A 0 50%)',
              backgroundSize: '20px 20px',
            }}
          >
            {processedImage ? (
              <Image src={processedImage} alt="Processed image with background removed" width={400} height={400} className="rounded-md object-contain max-h-full max-w-full" />
            ) : originalImage ? (
               <Image src={originalImage} alt="Original image before processing" width={400} height={400} className="rounded-md object-contain max-h-full max-w-full" />
            ) : (
              <div className="text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">Your image will be shown here</p>
              </div>
            )}
          </div>
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
