import React from 'react';
import CoursePageTemplate from '@/components/CoursePageTemplate';

const AdvancedNl: React.FC = () => {
  return (
    <CoursePageTemplate
      pageSlug="advanced"
      locale="nl"
      fallbackContent={{
        hero_title: 'PADI Advanced Open Water-cursus',
        hero_subtitle: 'Breid je vaardigheden uit met vijf Adventure Dives, waaronder diepduiken en navigatie. Perfect voor het verkennen van diepere duiklocaties.',
        course_overview: 'De PADI Advanced Open Water-cursus verbetert je onderwatervaardigheden door middel van praktijkduiken. Inclusief Deep, Navigation, Peak Performance Buoyancy en twee keuzevakken zoals Night of Wreck diving.',
        price_thb: '9500',
        price_usd: '275',
        price_eur: '250',
        duration: '2 dagen',
      }}
      heroImage="/images/advanved.png"
      level="Intermediate"
      sections={[
        {
          title: 'Wat je doet',
          content: [
            '5 adventureduiken (kan in 2-3 dagen)',
            'Oefenen van diepduiktechnieken en navigatie',
            'Verbeteren van drijfvermogen en comfort onder water',
            'Kies keuzevakken: Night, Wreck, Fish ID, Fotografie, etc.',
          ],
        },
        {
          title: 'Vereisten',
          content: 'Open Water Diver-brevet (of gelijkwaardig) en minimumleeftijd van 12 jaar.',
        },
        {
          title: 'Inbegrepen',
          content: [
            'Lesmateriaal en PADI-certificering',
            'Huur van alle uitrusting',
            'Bootkosten waar van toepassing',
            'Professionele instructie',
          ],
        },
      ]}
      faqs={[
        {
          question: 'Moet ik een test doen?',
          answer: 'Geen examen vereist! De Advanced-cursus draait helemaal om ervaring en praktijk.',
        },
        {
          question: 'Kan ik mijn Adventure Dives kiezen?',
          answer: 'Deep en Navigation zijn verplicht. Je kiest 3 keuzevakken uit opties zoals Night, Wreck, Peak Performance Buoyancy, Fish ID, en meer.',
        },
      ]}
    />
  );
};

export default AdvancedNl;
