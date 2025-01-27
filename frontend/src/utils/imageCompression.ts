// utils/imageCompression.ts

interface CompressionResult {
    file: File;
    originalSize: number;
    compressedSize: number;
    compressionRatio: number;
  }
  
  export const compressImage = async (
    file: File, 
    maxSizeMB: number = 0.3, // Reduced to 300KB default
    minQuality: number = 0.3  // Won't compress below this quality
  ): Promise<CompressionResult> => {
    // Early return if file is already smaller than target size
    if (file.size <= maxSizeMB * 1024 * 1024) {
      return {
        file,
        originalSize: file.size,
        compressedSize: file.size,
        compressionRatio: 1
      };
    }
  
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const img = new Image();
        img.src = event.target?.result as string;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Maintain aspect ratio while setting max dimensions
          const maxDimension = 2000; // Max width/height
          let width = img.width;
          let height = img.height;
          
          if (width > height && width > maxDimension) {
            height = (height * maxDimension) / width;
            width = maxDimension;
          } else if (height > maxDimension) {
            width = (width * maxDimension) / height;
            height = maxDimension;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Draw image with smooth scaling
          ctx?.drawImage(img, 0, 0, width, height);
          
          let quality = 0.9;
          let compressedFile: File;
          const originalSize = file.size;
          
          const compress = () => {
            // Determine output type based on input
            const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
            const dataUrl = canvas.toDataURL(outputType, quality);
            const binaryStr = atob(dataUrl.split(',')[1]);
            const bytes = new Uint8Array(binaryStr.length);
            
            for (let i = 0; i < binaryStr.length; i++) {
              bytes[i] = binaryStr.charCodeAt(i);
            }
            
            compressedFile = new File([bytes], file.name, { type: outputType });
            
            // Continue compression if file is still too large and quality is above minimum
            if (compressedFile.size > maxSizeMB * 1024 * 1024 && quality > minQuality) {
              quality -= 0.1;
              compress();
            } else {
              resolve({
                file: compressedFile,
                originalSize,
                compressedSize: compressedFile.size,
                compressionRatio: compressedFile.size / originalSize
              });
            }
          };
          
          compress();
        };
        
        img.onerror = reject;
      };
      
      reader.onerror = reject;
    });
  };