import React from 'react';
import CoursePageTemplate from '@/components/CoursePageTemplate';

const RescueNl: React.FC = () => {
  return (
    <CoursePageTemplate
      pageSlug="rescue"
      locale="nl"
      fallbackContent={{
        hero_title: 'PADI Rescue Diver',
        hero_subtitle: 'Ontwikkel de vaardigheden en het vertrouwen om duiknoodsituaties te beheersen en anderen te helpen. De Rescue Diver-cursus is een belangrijke stap voor serieuze duikers.',
        course_overview: 'De Rescue Diver-cursus leert je duiknoodsituaties te voorkomen en te beheersen, reddingen uit te voeren en met vertrouwen als onderdeel van een duikteam te werken.',
        price_thb: '10000',
        price_usd: '290',
        price_eur: '265',
        duration: '3 dagen',
      }}
      heroImage="/images/photo-1613853250147-2f73e55c1561.avif"
      level="Gevorderd"
      bookingItemName="PADI Rescue Diver"
      sections={[
        {
          title: 'Behandelde vaardigheden',
          content: [
            'Zelfredding en herkennen van duikerstress',
            "Reddingsscenario's en technieken",
            'Noodmanagement en uitrusting',
            'Reddingsbeademing en slachtofferzorg',
          ],
        },
        {
          title: 'Opbouw en vereisten vooraf',
          content: 'Duur: meestal 3 dagen met zwembad- en buitenwatersessies. Vereist: EFR (of gelijkwaardig) en een Open Water-brevet.',
        },
        {
          title: 'Inbegrepen',
          content: [
            'Lesmateriaal en certificering',
            'Reddingsvaardigheidstraining in zwembad en buitenwater',
            'Huur van alle uitrusting',
          ],
        },
      ]}
      faqs={[
        {
          question: 'Is Rescue moeilijk?',
          answer: 'De cursus is uitdagend, maar instructeurs begeleiden je stap voor stap. Een goede conditie en comfort in het water helpen.',
        },
      ]}
    />
  );
};

export default RescueNl;
