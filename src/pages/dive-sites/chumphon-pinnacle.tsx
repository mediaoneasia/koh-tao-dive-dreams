import React from 'react';
import DiveSiteDetail from '@/components/DiveSiteDeta';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '@/hooks/usePageContent';

const fallbackContent = {
  overview: '',
  quickFacts: '',
  whatYouCanSee: '[]',
  marineLifeHighlights: '[]',
  divingTips: '[]',
  images: '[]',
};

const ChumphonPinnacle = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language.startsWith('nl') ? 'nl' : 'en';
  const { content, isLoading } = usePageContent({
    pageSlug: 'chumphon-pinnacle',
    locale,
    fallbackContent,
  });

  // Parse JSON fields safely
  let quickFacts = { depth: '', difficulty: '', location: '', bestTime: '' };
  try {
    quickFacts = content.quickFacts ? JSON.parse(content.quickFacts) : quickFacts;
  } catch {}
  let whatYouCanSee: string[] = [];
  try {
    whatYouCanSee = content.whatYouCanSee ? JSON.parse(content.whatYouCanSee) : [];
  } catch {}
  let marineLifeHighlights: string[] = [];
  try {
    marineLifeHighlights = content.marineLifeHighlights ? JSON.parse(content.marineLifeHighlights) : [];
  } catch {}
  let divingTips: string[] = [];
  try {
    divingTips = content.divingTips ? JSON.parse(content.divingTips) : [];
  } catch {}
  let images: string[] = [
    "/images/chumphon-pinnacle-top.webp",
    "/images/photo-1682686580849-3e7f67df4015.avif",
    "/images/photo-1613853250147-2f73e55c1561.avif",
    "/images/photo-1618865181016-a80ad83a06d3.avif",
    "/images/photo-1647825194145-2d94e259c745.avif",
    "/images/photo-1659518893171-b15e20a8e201.avif",
    "/images/photo-1682687982423-295485af248a.avif"
  ];
  try {
    const imgs = content.images ? JSON.parse(content.images) : [];
    if (Array.isArray(imgs) && imgs.length > 0) images = imgs;
  } catch {}

  if (isLoading) return <div>Loading...</div>;

  return (
    <DiveSiteDetail
      name="Chumphon Pinnacle"
      overview={content.overview || ''}
      quickFacts={quickFacts}
      whatYouCanSee={whatYouCanSee}
      marineLifeHighlights={marineLifeHighlights}
      divingTips={divingTips}
      images={images}
    />
  );
};

export default ChumphonPinnacle;
