import React, { useRef, useState, useEffect } from "react";

const MAX_CANVAS_SIZE = { width: 500, height: 500 }; // Set your max width and height

const ImageCropper = ({ photo, setCroppedPhoto }) => {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0, size: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (photo) {
      const img = new Image();
      img.src = URL.createObjectURL(photo);

      img.onload = () => {
        setImage(img);
        drawImage(img);
      };

      return () => {
        URL.revokeObjectURL(img.src); // Clean up URL object
      };
    }
  }, [photo]);

  const drawImage = (img) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Calculate the scale to maintain aspect ratio
    const scale = Math.min(MAX_CANVAS_SIZE.width / img.width, MAX_CANVAS_SIZE.height / img.height);
    const width = img.width * scale;
    const height = img.height * scale;

    // Set canvas dimensions based on the scaled image
    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, width, height);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPoint({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    finalizeCrop();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const endPoint = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    const size = Math.min(
      Math.abs(startPoint.x - endPoint.x),
      Math.abs(startPoint.y - endPoint.y)
    );
    const newCrop = {
      x: Math.min(startPoint.x, endPoint.x),
      y: Math.min(startPoint.y, endPoint.y),
      size,
    };
    setCrop(newCrop);

    drawCrop(newCrop);
  };

  const drawCrop = (crop) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx || !image) return;

    // Redraw the image
    drawImage(image);

    // Draw the cropping rectangle
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.strokeRect(crop.x, crop.y, crop.size, crop.size);
  };

  const finalizeCrop = () => {
    if (!image) return;

    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / canvasRef.current.width;
    const scaleY = image.naturalHeight / canvasRef.current.height;

    canvas.width = crop.size * scaleX;
    canvas.height = crop.size * scaleY;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.size * scaleX,
      crop.size * scaleY,
      0,
      0,
      crop.size * scaleX,
      crop.size * scaleY
    );

    canvas.toBlob((blob) => {
      setCroppedPhoto(blob);
    }, "image/jpeg");
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={MAX_CANVAS_SIZE.width}
        height={MAX_CANVAS_SIZE.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      {photo ? <p>Click and drag to crop the image.</p> : <p>No photo selected. Please upload an image.</p>}
    </div>
  );
};

export default ImageCropper;
