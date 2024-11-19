import React from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  imageUrl?: string;
  onImageUpload: (file: File) => void;
  onImageRemove: () => void;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  imageUrl,
  onImageUpload,
  onImageRemove,
  className = "w-32 h-32"
}) => {
  return (
    <div className={`relative ${className}`}>
      {imageUrl ? (
        <div className="relative group">
          <img
            src={imageUrl}
            alt="Uploaded image"
            className="w-full h-full object-cover rounded-lg"
          />
          <button
            onClick={onImageRemove}
            className="absolute top-2 right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      ) : (
        <div className="w-full h-full bg-gray-700 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600 hover:border-purple-500 transition-colors">
          <div className="text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <span className="text-sm text-gray-400">Upload Image</span>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onImageUpload(file);
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};