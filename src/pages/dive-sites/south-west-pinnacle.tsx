import React, { useMemo, useState, Suspense } from 'react';
const FunDiveBooking = React.lazy(() => import('@/components/FunDiveBooking'));
import DiveSiteDetail from '@/components/DiveSiteDetail';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '@/hooks/usePageContent';

const SouthWestPinnacle = () => {
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
        ? 'South West Pinnacle is een diepe offshore duiklocatie met meerdere granieten pinnacles en rotsblokken die vanaf de bodem omhoogkomen. De site ligt op 30-40 minuten varen van Koh Tao en staat bekend om spannende blue-water-ontmoetingen en sterke kans op pelagische soorten. Je ziet hier vaak scholen barracuda, trevally en makreel, met af en toe walvishaaien en brydevinvissen. Door de diepte en mogelijke stroming is dit een uitdagende maar zeer belonende duik voor ervaren duikers.'
        : 'South West Pinnacle is a deep offshore dive site made up of multiple granite pinnacles and boulders rising from the seabed. Located 30-40 minutes from Koh Tao, it is known for exciting blue-water encounters and strong pelagic potential. The site often features schools of barracuda, trevally, and mackerel, with occasional visits from whale sharks and Bryde\'s whales. Due to depth and current exposure, it offers a rewarding challenge for experienced divers.',
      quick_facts_depth: '15-35m',
      quick_facts_difficulty: isDutch ? 'Gevorderd' : 'Advanced',
      quick_facts_location: isDutch ? '30-40 minuten offshore' : '30-40 minutes offshore',
      quick_facts_best_time: isDutch ? 'Hele jaar, beste periode bij kalme zee' : 'Year-round, best in calm season',
      what_you_can_see: isDutch
        ? 'Walvishaaien\nBrydevinvissen\nReuzenbarracuda\nKoningsmakreel'
        : 'Whale sharks\nBryde\'s whales\nGiant barracuda\nSpanish mackerel',
      marine_life_highlights: isDutch
        ? 'Af en toe ontmoetingen met walvishaaien\nBrydevinvissen in gunstige seizoensperiodes\nGrote scholen barracuda en makreel\nTrevally, rifvissen en jagende pelagische soorten bij stromingslijnen'
        : 'Occasional whale shark encounters\nBryde\'s whales in favorable seasonal windows\nLarge schools of barracuda and mackerel\nTrevally, reef fish, and hunting pelagics in current lines',
      diving_tips: isDutch
        ? 'Geschikt voor gevorderde duikers met ervaring in diepe en driftduiken\nGebruik een SMB en blijf tijdens de opstijging bij de groep\nPlan je gasvoorraad zorgvuldig door diepte en stroming\nLuister goed naar de briefing omdat entry en pickup per dag verschillen'
        : 'Best suited for advanced divers with deep and drift experience\nUse delayed SMB and stay with the group during ascent\nPlan gas carefully due to depth and current exposure\nListen closely to briefing because entry and pickup can vary by conditions',
      images: '/images/photo-1682686580849-3e7f67df4015.avif',
    }),
    [isDutch]
  );

  const { content } = usePageContent({ pageSlug: 'south-west-pinnacle', locale, fallbackContent });

  const [showBooking, setShowBooking] = useState(false);

  return (
    <>
      <div className="px-4 md:px-8">
        <DiveSiteDetail
          name="South West Pinnacle"
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
      </div>
      <div className="flex justify-center my-8">
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
          onClick={() => setShowBooking(true)}
        >
          Book a Fun Dive
        </button>
      </div>
      {showBooking && (
        <Suspense fallback={<div className="text-center py-8">Loading booking form…</div>}>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-4 relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                onClick={() => setShowBooking(false)}
                aria-label="Close"
              >
                ×
              </button>
              <FunDiveBooking />
            </div>
          </div>
        </Suspense>
      )}
    </>
  );
};

export default SouthWestPinnacle;
