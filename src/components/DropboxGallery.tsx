import React, { useEffect, useState } from 'react';

interface DropboxGalleryProps {
  folder: string; // e.g. "japanese-gardens" or "open-water-course"
}

const DropboxGallery: React.FC<DropboxGalleryProps> = ({ folder }) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/dropbox-gallery?folder=${encodeURIComponent(folder)}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setImages(data);
          return;
        }

        setImages([]);
        setError(typeof data?.error === 'string' ? data.error : 'Failed to load gallery');
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load gallery');
        setLoading(false);
      });
  }, [folder]);

  if (loading) return <div>Loading gallery...</div>;
  if (error) return <div>{error}</div>;
  if (!images.length) return <div>No images found for this section.</div>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 my-8">
      {images.map((url, idx) => (
        <div key={idx} className="aspect-w-1 aspect-h-1 bg-gray-100 rounded overflow-hidden shadow">
          <img src={url} alt="Gallery" className="object-cover w-full h-full" loading="lazy" />
        </div>
      ))}
    </div>
  );
};

export default DropboxGallery;
