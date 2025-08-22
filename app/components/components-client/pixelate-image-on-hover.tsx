"use client";

import React, { useEffect, useRef, useCallback } from "react";

export interface PixelateImageProps {
  src: string;
  width?: number;  // canvas bitmap width in px
  height?: number; // canvas bitmap height in px
}

const PixelateImage: React.FC<PixelateImageProps> = ({
  src,
  width = 1200,
  height = 1200,
}) => {
  /** Canvas and image refs */
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const isImageLoadedRef = useRef(false);

  /** Animation state refs */
  const animationFrameRef = useRef<number | null>(null);
  const animatingRef = useRef(false);

  /** Draw pixelated version */
  const pixelate = useCallback((v: number) => {
    if (!isImageLoadedRef.current) return;
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;
    (ctx as any).mozImageSmoothingEnabled = false;
    (ctx as any).webkitImageSmoothingEnabled = false;

    const size = v * 0.003;
    const w = Math.max(1, Math.floor(canvas.width * size));
    const h = Math.max(1, Math.floor(canvas.height * size));

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, w, h);
    ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
  }, []);

  /** Draw original crisp image */
  const drawOriginal = useCallback(() => {
    if (!isImageLoadedRef.current) return;
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, []);

  /** Start animation */
  const animate = useCallback(() => {
    if (!isImageLoadedRef.current) return;

    let fi = 0;
    const step = 0.6; // Lower = slower
    let frames = [2, 4, 5, 6, 8, 9, 10, 13, 21, 100];

    frames = [4, 8, 9, 10, 13, 21, 100];

    const loop = () => {
      if (!animatingRef.current) return;

      if (fi >= frames.length) {
        drawOriginal();
        return;
      }

      const frameValue = frames[Math.floor(fi)];
      if (typeof frameValue === "number") {
        pixelate(frameValue);
      } else {
        drawOriginal();
        return;
      }

      fi += step;
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animatingRef.current = true;
    loop();
  }, [pixelate, drawOriginal]);

  /** Stop animation */
  const stopAnimation = useCallback(() => {
    animatingRef.current = false;
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    drawOriginal();
  }, [drawOriginal]);

  /** Load image and draw initially */
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      imgRef.current = img;
      isImageLoadedRef.current = true;
      drawOriginal();
    };
    return () => {
      stopAnimation();
    };
  }, [src, drawOriginal, stopAnimation]);

  return (
    <>
      {/* Internal button trigger */}
      <a
        className="go-button clearfix" href="#"
        onMouseEnter={(e) => {e.preventDefault(); animate();}}
        onMouseLeave={(e) => {e.preventDefault();stopAnimation();}}
      >
        <span className="svg-icon svg-icon-arrow fl"></span>
      </a>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          display: "block",
          width: `${width}px`,
          height: `${height}px`,
        }}
      />
    </>
  );
};

export default PixelateImage;