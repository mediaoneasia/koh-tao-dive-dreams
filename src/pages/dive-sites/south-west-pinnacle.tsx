import React from 'react';
import DiveSiteDetail from '@/components/DiveSiteDetail';
import { useTranslation } from 'react-i18next';

const SouthWestPinnacle = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');

  const content = {
    en: {
      overview: 'Your new overview content here',
      quickFacts: {
        depth: '15-35m',
        difficulty: 'Advanced',
        location: '30-40 minutes offshore',
        bestTime: 'May–September',
      },
      whatYouCanSee: ['Whale sharks', 'Bryde’s whales', 'Giant barracuda', 'Spanish mackerel'],
      marineLifeHighlights: ['test'],
      divingTips: ['test'],
      images: ['/images/photo-1682686580849-3e7f67df4015.avif'],
    },
    nl: {
      overview: 'Dutch overview content here',
      quickFacts: {
        depth: '15-35m',
        difficulty: 'Gevorderd',
        location: '30-40 minuten offshore',
        bestTime: 'Mei–September',
      },
      whatYouCanSee: ['Walvishaaien', 'Brydevinvissen', 'Reuzenbarracuda', 'Koningsmakreel'],
      marineLifeHighlights: ['Dutch marine life highlights here'],
      divingTips: ['Dutch quick facts here'],
      images: ['/images/photo-1682686580849-3e7f67df4015.avif'],
    },
  };

  const locale = isDutch ? 'nl' : 'en';
  const data = content[locale];

  return (
    <DiveSiteDetail
      name="South West Pinnacle"
      overview={data.overview}
      quickFacts={data.quickFacts}
      whatYouCanSee={data.whatYouCanSee}
      marineLifeHighlights={data.marineLifeHighlights}
      divingTips={data.divingTips}
      images={data.images}
    />
  );
};

export default SouthWestPinnacle;
