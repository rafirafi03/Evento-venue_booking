export const ResizeImage = (file: File, width: number, height: number): Promise<File | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      // Load the image from the file
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (!e.target?.result) {
          return reject(new Error("Failed to read the file."));
        }
  
        const img: HTMLImageElement = new Image();
        img.src = e.target.result as string;
  
        img.onload = () => {
          // Create a canvas to draw the resized image
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
  
          const ctx = canvas.getContext('2d');
          if (ctx) {
            // Draw the resized image on the canvas
            ctx.drawImage(img, 0, 0, width, height);
  
            // Convert the canvas to a Blob and then to a File
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const resizedFile = new File([blob], file.name, {
                    type: 'image/jpeg',
                    lastModified: Date.now(),
                  });
                  resolve(resizedFile); // Return the resized file
                } else {
                  resolve(null); // Handle case where Blob creation fails
                }
              },
              'image/jpeg',
              0.8 // Adjust quality as needed
            );
          } else {
            reject(new Error("Failed to get canvas context."));
          }
        };
  
        img.onerror = () => {
          reject(new Error("Failed to load the image."));
        };
      };
  
      reader.onerror = () => {
        reject(new Error("Failed to read the file."));
      };
  
      reader.readAsDataURL(file); // Read the file as a Data URL
    });
  };