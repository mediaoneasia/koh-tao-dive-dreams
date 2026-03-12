import React from 'react';
import CoursePageTemplate from '@/components/CoursePageTemplate';

const DiscoverScubaNl: React.FC = () => {
  return (
    <CoursePageTemplate
      pageSlug="discover-scuba"
      locale="nl"
      fallbackContent={{
        hero_title: 'Discover Scuba Diving (DSD)',
        hero_subtitle: 'Ervaar hoe het is om onder water te ademen, zonder brevet nodig. Dit beginnersprogramma is de perfecte eerste duikervaring op Koh Tao.',
        course_overview: 'Discover Scuba Diving is gemaakt voor niet-gecertificeerde duikers die veilig willen kennismaken met echt duiken onder begeleiding van een professionele instructeur. Je start met een korte briefing en basisvaardigheden in beschut water, daarna ga je naar ondiep open water.',
        price_thb: '2500',
        price_usd: '72',
        price_eur: '66',
        duration: '1 dag',
      }}
      heroImage="/images/discover-scuba-dsd.png"
      level="Beginner"
      bookingItemName="Discover Scuba Diving"
      bookingType="dive"
      sections={[
        {
          title: 'Hoe werkt het?',
          content: [
            'Stap 1: Briefing en basisvaardigheden in beschut water',
            'Stap 2: Eerste buitenwaterduik onder directe begeleiding',
          ],
        },
        {
          title: 'Wat is inbegrepen?',
          content: [
            'Gecertificeerde duikprofessional',
            'Gebruik van alle duikuitrusting',
            'Maximaal 4 deelnemers per instructeursgroep',
            'Mogelijkheid om extra duiken toe te voegen',
          ],
        },
      ]}
      faqs={[
        {
          question: 'Wat is Discover Scuba Diving (DSD)?',
          answer: 'DSD is een beginnerservaring waarmee niet-gecertificeerde duikers in een gecontroleerde, veilige omgeving kunnen kennismaken met duiken voordat ze een volledige cursus volgen.',
        },
        {
          question: 'Heb ik een brevet nodig om mee te doen?',
          answer: 'Nee. DSD is juist bedoeld voor beginners en mensen die nog nooit hebben gedoken.',
        },
        {
          question: 'Wat kan ik op de dag zelf verwachten?',
          answer: 'Je krijgt een korte uitleg, veiligheidsbriefing en oefent basisvaardigheden voordat je je eerste buitenwaterduik maakt met je instructeur.',
        },
        {
          question: 'Wat is de DSD Deluxe-optie?',
          answer: 'Deluxe is een uitgebreidere ervaring met extra duiken en meer tijd onder water, ideaal als je daarna mogelijk verder wilt met Open Water.',
        },
      ]}
    />
  );
};

export default DiscoverScubaNl;
