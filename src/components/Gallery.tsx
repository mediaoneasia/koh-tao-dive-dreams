import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Import local images

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');

  const images = isDutch ? [
    {
      src: "/images/photo-1682687982423-295485af248a.avif",
      alt: "Duikers op een boot, klaar voor de duik",
      category: "Duiken"
    },
    {
      src: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Ontmoeting met een walvishaai",
      category: "Grote vissen"
    },
    {
      src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Onderwaterfotograaf",
      category: "Duiken"
    }
  ] : [
    {
      src: "/images/photo-1682687982423-295485af248a.avif",
      alt: "Divers on a boat ready to dive",
      category: "Diving"
    },
    {
      src: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Whale shark encounter",
      category: "Big fish"
    },
    {
      src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Underwater photographer",
      category: "Diving"
    }
  ];

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {isDutch ? 'Onderwatergalerij' : 'Underwater Gallery'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isDutch
              ? 'Ervaar de adembenemende schoonheid van de onderwaterwereld van Koh Tao in onze fotogalerij'
              : 'Experience the breathtaking beauty of Koh Tao’s underwater world in our photo gallery'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
                <div className="text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setSelectedImage(null)}
                title={isDutch ? 'Sluiten' : 'Close'}
                aria-label={isDutch ? 'Sluiten' : 'Close'}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              >
                <X className="h-8 w-8" />
              </button>
              
              <button
                onClick={prevImage}
                title={isDutch ? 'Vorige afbeelding' : 'Previous image'}
                aria-label={isDutch ? 'Vorige afbeelding' : 'Previous image'}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              
              <button
                onClick={nextImage}
                title={isDutch ? 'Volgende afbeelding' : 'Next image'}
                aria-label={isDutch ? 'Volgende afbeelding' : 'Next image'}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <ChevronRight className="h-8 w-8" />
              </button>

              <img
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                className="max-w-full max-h-full object-contain"
              />
              
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-lg font-medium">{images[selectedImage].alt}</p>
                <p className="text-sm text-gray-300">{images[selectedImage].category}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
