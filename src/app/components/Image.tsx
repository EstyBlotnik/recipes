import { useEffect, useRef, useState } from 'react';
import { ImageResizerProps } from '@/app/types/props'


const ImageResizer: React.FC<ImageResizerProps> = ({ imageUrl, width }) => {
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!imageUrl) return;
    const img = new Image();
    img.crossOrigin = 'anonymous'; // או 'use-credentials' בהתאם להגדרות ה-CORS של השרת
    console.log("היתה בעיה בהתחברות. נסה שוב.");

    img.src = imageUrl;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // יחס 2:3
      const targetWidth = width; // רוחב תמונה חדש
      const targetHeight = width / 4 * 3; // גובה תמונה חדש

      const imgWidth = img.width;
      const imgHeight = img.height;

      const targetAspect = targetWidth / targetHeight;
      const imgAspect = imgWidth / imgHeight;

      let cropWidth, cropHeight;

      if (imgAspect > targetAspect) {
        cropHeight = imgHeight;
        cropWidth = imgHeight * targetAspect; // חישוב רוחב חדש בהתאמה ליחס 2:3
      } else {
        cropWidth = imgWidth;
        cropHeight = imgWidth / targetAspect; // חישוב גובה חדש בהתאמה ליחס 2:3
      }

      const cropX = (imgWidth - cropWidth) / 2; // חיתוך ממורכז
      const cropY = (imgHeight - cropHeight) / 2; // חיתוך ממורכז

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, targetWidth, targetHeight);

      const resizedBase64 = canvas.toDataURL('image/jpeg');
      setResizedImage(resizedBase64);
    };
  }, [imageUrl]);

  return (
    <div>
      <canvas ref={canvasRef} width={width} height={width / 4 * 3} style={{ display: 'none' }} />
      {resizedImage && <img src={resizedImage} alt="Resized" />}
    </div>
  );
};

export default ImageResizer;
