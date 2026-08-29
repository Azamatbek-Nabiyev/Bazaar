import { useState } from "react";
import type { ProductGalleryProps } from "../../types/product";


export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      <div className="flex flex-col gap-3">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setActiveImage(i)}
            className={`w-16 h-16 overflow-hidden border-2 transition-colors ${
              i === activeImage ? "border-neutral-900" : "border-transparent"
            }`}
          >
            <img src={src} alt={`${alt} thumbnail ${i + 1}`} className="w-full h-full object-cover object-top" />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="flex-1 aspect-square bg-neutral-100 overflow-hidden">
        <img
          src={images[activeImage]}
          alt={alt}
          className="w-full h-full object-cover object-top"
        />
      </div>
    </div>
  );
}