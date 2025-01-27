// utils/imageCompression.ts

export const compressImage = (file: File, maxSizeMB: number = 1): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const img = new Image();
        img.src = event.target?.result as string;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Set initial dimensions
          canvas.width = img.width;
          canvas.height = img.height;
          
          // Draw original image to canvas
          ctx?.drawImage(img, 0, 0);
          
          // Start with high quality
          let quality = 0.9;
          let compressedFile: File;
          
          // Try compression with reducing quality until file size is under maxSizeMB
          const compress = () => {
            const dataUrl = canvas.toDataURL('image/jpeg', quality);
            const binaryStr = atob(dataUrl.split(',')[1]);
            const binaryLength = binaryStr.length;
            const bytes = new Uint8Array(binaryLength);
            
            for (let i = 0; i < binaryLength; i++) {
              bytes[i] = binaryStr.charCodeAt(i);
            }
            
            compressedFile = new File([bytes], file.name, { type: 'image/jpeg' });
            
            // Check if file size is still too large
            if (compressedFile.size > maxSizeMB * 1024 * 1024 && quality > 0.1) {
              quality -= 0.1;
              compress();
            } else {
              resolve(compressedFile);
            }
          };
          
          compress();
        };
        
        img.onerror = (error) => {
          reject(error);
        };
      };
      
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };