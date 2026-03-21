import React from 'react';
import DiveSiteDetail from '@/components/DiveSiteDetail';
import { useTranslation } from 'react-i18next';

const SailRock = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');

  // English and Dutch content for each section
  const content = {
    en: {
      overview: 'Your new overview content here',
      quickFacts: {
        depth: '18-40m',
        difficulty: 'Advanced',
        location: '40 minutes offshore',
        bestTime: 'May–September',
      },
      whatYouCanSee: ['Whale sharks', 'Giant barracuda', 'Malabar grouper', 'Sailfish'],
      marineLifeHighlights: ['test'],
      divingTips: ['test'],
      images: ['/images/photo-1682686580849-3e7f67df4015.avif'],
    },
    nl: {
      overview: 'Dutch overview content here',
      quickFacts: {
        depth: '18-40m',
        difficulty: 'Gevorderd',
        location: '40 minuten offshore',
        bestTime: 'Mei–September',
      },
      whatYouCanSee: ['Walvishaaien', 'Reuzenbarracuda', 'Malabar grouper', 'Zeilvis'],
      marineLifeHighlights: ['Dutch marine life highlights here'],
      divingTips: ['Dutch quick facts here'],
      images: ['/images/photo-1682686580849-3e7f67df4015.avif'],
    },
  };

  const locale = isDutch ? 'nl' : 'en';
  const data = content[locale];

  return (
    <DiveSiteDetail
      name="Sail Rock"
      overview={data.overview}
      quickFacts={data.quickFacts}
      whatYouCanSee={data.whatYouCanSee}
      marineLifeHighlights={data.marineLifeHighlights}
      divingTips={data.divingTips}
      images={data.images}
    />
  );
};

export default SailRock;
