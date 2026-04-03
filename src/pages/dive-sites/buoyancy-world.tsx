import React, { useMemo } from 'react';
import DiveSiteBookingCTA from '@/components/DiveSiteBookingCTA';
import DiveSiteDetail from '@/components/DiveSiteDetail';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '@/hooks/usePageContent';

const BuoyancyWorld = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');
  const locale = isDutch ? 'nl' : 'en';

  const toList = (value: string) =>
    String(value || '')
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);

  const fallbackContent = useMemo(
    () => ({
      overview: isDutch
        ? 'Buoyancy World is speciaal ontworpen om drijfvermogen en controle te oefenen in ondiep water. De kunstmatige structuren trekken ook klein zeeleven aan, waardoor de site zowel leerzaam als verrassend leuk blijft.'
        : 'Buoyancy World was designed specifically for buoyancy and control practice in shallow water. Its artificial structures also attract small marine life, so the site stays educational without feeling boring.',
      quick_facts_depth: '5-12m',
      quick_facts_difficulty: isDutch ? 'Beginner' : 'Beginner',
      quick_facts_location: 'Aow Leuk',
      quick_facts_best_time: isDutch ? 'Hele jaar, rustig in kalm weer' : 'Year-round, calm in settled weather',
      what_you_can_see: isDutch
        ? 'Betonstructuren\nNieuwe koraalgroei\nKlein zeeleven\nTrainingsplatforms'
        : 'Concrete structures\nNew coral growth\nSmall marine life\nTraining platforms',
      marine_life_highlights: isDutch
        ? 'Juveniele rifvissen\nBlennies en gobies\nKoraal op structuren\nEducatieve habitats'
        : 'Juvenile reef fish\nBlennies and gobies\nCoral on structures\nEducational habitats',
      diving_tips: isDutch
        ? 'Perfect om trim en controle te oefenen\nIdeaal voor Open Water en Peak Performance Buoyancy\nBlijf langzaam en precies rond de structuren\nGoed voor camera-oefening in ondiep licht'
        : 'Perfect for practicing trim and control\nIdeal for Open Water and Peak Performance Buoyancy\nMove slowly and precisely around the structures\nGood for camera practice in shallow light',
      images: '/images/aowluk.jpg\n/images/tanote.png',
    }),
    [isDutch]
  );

  const { content } = usePageContent({ pageSlug: 'buoyancy-world', locale, fallbackContent });
  return (
    <>
      <DiveSiteDetail
        name="Buoyancy World"
        overview={content.overview}
        quickFacts={{
          depth: content.quick_facts_depth,
          difficulty: content.quick_facts_difficulty,
          location: content.quick_facts_location,
          bestTime: content.quick_facts_best_time,
        }}
        whatYouCanSee={toList(content.what_you_can_see)}
        marineLifeHighlights={toList(content.marine_life_highlights)}
        divingTips={toList(content.diving_tips)}
        images={toList(content.images)}
      />
      <DiveSiteBookingCTA siteName="Buoyancy World" />
    </>
  );
};

export default BuoyancyWorld;