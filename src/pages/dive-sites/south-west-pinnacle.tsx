import React from 'react';
import DiveSiteDetail from '@/components/DiveSiteDetail';
import { useTranslation } from 'react-i18next';

const SouthWestPinnacle = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');

  const content = {
    en: {
      overview:
        'South West Pinnacle is a deep offshore dive site made up of multiple granite pinnacles and boulders rising from the seabed. Located 30-40 minutes from Koh Tao, it is known for exciting blue-water encounters and strong pelagic potential. The site often features schools of barracuda, trevally, and mackerel, with occasional visits from whale sharks and Bryde\'s whales. Due to depth and current exposure, it offers a rewarding challenge for experienced divers.',
      quickFacts: {
        depth: '15-35m',
        difficulty: 'Advanced',
        location: '30-40 minutes offshore',
        bestTime: 'Year-round, best in calm season',
      },
      whatYouCanSee: ['Whale sharks', 'Bryde’s whales', 'Giant barracuda', 'Spanish mackerel'],
      marineLifeHighlights: [
        'Occasional whale shark encounters',
        'Bryde\'s whales in favorable seasonal windows',
        'Large schools of barracuda and mackerel',
        'Trevally, reef fish, and hunting pelagics in current lines',
      ],
      divingTips: [
        'Best suited for advanced divers with deep and drift experience',
        'Use delayed SMB and stay with the group during ascent',
        'Plan gas carefully due to depth and current exposure',
        'Listen closely to briefing because entry and pickup can vary by conditions',
      ],
      images: ['/images/photo-1682686580849-3e7f67df4015.avif'],
    },
    nl: {
      overview:
        'South West Pinnacle is een diepe offshore duiklocatie met meerdere granieten pinnacles en rotsblokken die vanaf de bodem omhoogkomen. De site ligt op 30-40 minuten varen van Koh Tao en staat bekend om spannende blue-water-ontmoetingen en sterke kans op pelagische soorten. Je ziet hier vaak scholen barracuda, trevally en makreel, met af en toe walvishaaien en brydevinvissen. Door de diepte en mogelijke stroming is dit een uitdagende maar zeer belonende duik voor ervaren duikers.',
      quickFacts: {
        depth: '15-35m',
        difficulty: 'Gevorderd',
        location: '30-40 minuten offshore',
        bestTime: 'Hele jaar, beste periode bij kalme zee',
      },
      whatYouCanSee: ['Walvishaaien', 'Brydevinvissen', 'Reuzenbarracuda', 'Koningsmakreel'],
      marineLifeHighlights: [
        'Af en toe ontmoetingen met walvishaaien',
        'Brydevinvissen in gunstige seizoensperiodes',
        'Grote scholen barracuda en makreel',
        'Trevally, rifvissen en jagende pelagische soorten bij stromingslijnen',
      ],
      divingTips: [
        'Geschikt voor gevorderde duikers met ervaring in diepe en driftduiken',
        'Gebruik een SMB en blijf tijdens de opstijging bij de groep',
        'Plan je gasvoorraad zorgvuldig door diepte en stroming',
        'Luister goed naar de briefing omdat entry en pickup per dag verschillen',
      ],
      images: ['/images/photo-1682686580849-3e7f67df4015.avif'],
    },
  };

  const locale = isDutch ? 'nl' : 'en';
  const data = content[locale];

  return (
    <div className="px-4 md:px-8">
      <DiveSiteDetail
        name="South West Pinnacle"
        overview={data.overview}
        quickFacts={data.quickFacts}
        whatYouCanSee={data.whatYouCanSee}
        marineLifeHighlights={data.marineLifeHighlights}
        divingTips={data.divingTips}
        images={data.images}
      />
    </div>
  );
};

export default SouthWestPinnacle;
