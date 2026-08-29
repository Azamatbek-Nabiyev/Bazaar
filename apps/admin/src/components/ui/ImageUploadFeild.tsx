import { useRef } from "react";
import { ImagePlus, X } from "lucide-react";

type ImageUploadFieldProps = {
  label: string;
  images: string[]; // preview URL lar (object URL yoki mavjud rasm linklari)
  onAdd: (files: FileList) => void;
  onRemove: (index: number) => void;
  error?: string;
  full?: boolean;
};

export const ImageUploadField = ({
  label,
  images,
  onAdd,
  onRemove,
  error,
  full,
}: ImageUploadFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={full ? "col-span-2" : ""}>
      <label className="text-xs font-medium text-neutral-500 mb-1.5 block">
        {label}
      </label>

      <div className="flex flex-wrap gap-3">
        {images.map((src, i) => (
          <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-neutral-200">
            <img src={src} alt={`upload-${i}`} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => onRemove(i)}
              className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 hover:bg-black/80"
            >
              <X size={12} />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-20 h-20 rounded-lg border-2 border-dashed border-neutral-300 flex items-center justify-center text-neutral-400 hover:border-neutral-400 hover:text-neutral-600 transition-colors"
        >
          <ImagePlus size={20} />
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => {
            if (e.target.files) onAdd(e.target.files);
            e.target.value = ""; // qayta shu faylni tanlash imkonini beradi
          }}
        />
      </div>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};