import React from 'react';
import CoursePageTemplate from '@/components/CoursePageTemplate';

const ScubaDiverNl: React.FC = () => {
  return (
    <CoursePageTemplate
      pageSlug="scuba-diver"
      locale="nl"
      fallbackContent={{
        hero_title: 'PADI Scuba Diver-cursus',
        hero_subtitle: 'Ontdek de onderwaterwereld met vertrouwen. De PADI Scuba Diver-cursus is perfect voor wie duiken wil proberen voordat je voor volledige certificering gaat.',
        course_overview: 'De PADI Scuba Diver-cursus laat je op een leuke en ontspannen manier kennismaken met de onderwaterwereld. Je leert basisvaardigheden voor duiken en verkent ondiepe riffen, zodat je met vertrouwen verder kunt in je duikavontuur. Deze cursus is een introductie tot duiken en kan worden opgewaardeerd naar volledige Open Water-certificering.',
        price_thb: '8500',
        price_usd: '245',
        price_eur: '225',
        duration: '2-3 dagen',
      }}
      heroImage="/images/openwater/openwater.jpg"
      level="Instapniveau"
      bookingItemName="PADI Scuba Diver Course"
      sections={[
        {
          title: 'Wat je leert',
          content: [
            'Basis duiktheorie en -fysica',
            'Correct gebruik van duikuitrusting',
            'Fundamentele duikvaardigheden en veiligheidsprocedures',
            'Onderwatercommunicatie en buddy-systeem',
            'Verkenning van ondiep water en rifbewustzijn',
            'Milieubewustzijn en mariene natuurbescherming',
          ],
        },
        {
          title: 'Cursusopbouw',
          content: 'De cursus bestaat uit theorielessen, training in beschut water en buitenwaterduiken. Je maakt 2 buitenwaterduiken in water tot maximaal 12 meter (40 voet), waardoor de cursus voor de meeste mensen toegankelijk is.',
        },
        {
          title: 'Waarom kiezen voor Scuba Diver?',
          content: [
            'Kortere cursus dan de volledige Open Water-cursus',
            'Perfecte introductie tot duiken',
            'Op te waarderen naar Open Water-certificering',
            'Leuke en ontspannen leeromgeving',
            'Verken de prachtige riffen van Koh Tao',
          ],
        },
      ]}
    />
  );
};

export default ScubaDiverNl;