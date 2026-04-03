import React, { useEffect, useState } from 'react';

const DROPBOX_API_ORIGIN = 'https://koh-tao-dive-dreams.vercel.app';

const toFriendlyGalleryError = (value: unknown) => {
  if (typeof value !== 'string' || !value.trim()) {
    return 'Gallery unavailable right now.';
  }

  const normalized = value.toLowerCase();

  if (normalized.includes('missing_scope') || normalized.includes('path/not_found')) {
    return 'Gallery unavailable right now.';
  }

  return 'Failed to load gallery.';
};

interface DropboxGalleryProps {
  folder: string; // e.g. "japanese-gardens" or "open-water-course"
}

const DropboxGallery: React.FC<DropboxGalleryProps> = ({ folder }) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiOrigin = typeof window !== 'undefined' && window.location.hostname === 'koh-tao-dive-dreams.vercel.app'
      ? ''
      : DROPBOX_API_ORIGIN;

    setLoading(true);
    setError(null);
    fetch(`${apiOrigin}/api/dropbox-gallery?folder=${encodeURIComponent(folder)}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setImages(data);
          setLoading(false);
          return;
        }

        setImages([]);
        setError(toFriendlyGalleryError(data?.error));
        setLoading(false);
      })
      .catch(err => {
        setError('Gallery unavailable right now.');
        setLoading(false);
      });
  }, [folder]);

  if (loading) return <div>Loading gallery...</div>;
  if (error) return <div className="text-sm text-muted-foreground">{error}</div>;
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
