import React, { useState } from 'react';

interface UniversityGalleryProps {
  items: string[];
}

const UniversityGallery: React.FC<UniversityGalleryProps> = ({ items }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div>
      {/* Grid Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((image, index) => (
          <div 
            key={index} 
            className="relative cursor-pointer overflow-hidden rounded-lg aspect-video"
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <img
              src={selectedImage}
              alt="Selected gallery image"
              className="w-full h-auto rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversityGallery;