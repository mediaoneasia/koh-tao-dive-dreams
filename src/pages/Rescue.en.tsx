import React from 'react';
import CoursePageTemplate from '@/components/CoursePageTemplate';

const RescueEn: React.FC = () => {
  return (
    <CoursePageTemplate
      pageSlug="rescue"
      locale="en"
      fallbackContent={{
        hero_title: 'PADI Rescue Diver',
        hero_subtitle: 'Develop the skills and confidence to manage dive emergencies and assist others. The Rescue Diver course is an important step for all serious divers.',
        course_overview: 'The Rescue Diver course teaches you to prevent and manage diving emergencies, perform rescues and work confidently as part of a dive team.',
        price_thb: '10000',
        price_usd: '290',
        price_eur: '265',
        duration: '3 days',
      }}
      heroImage="/images/photo-1613853250147-2f73e55c1561.avif"
      level="Advanced"
      bookingItemName="PADI Rescue Diver"
      sections={[
        {
          title: 'Skills covered',
          content: [
            'Self-rescue and diver stress recognition',
            'Rescue scenarios and techniques',
            'Emergency management and equipment',
            'Rescue breathing and casualty care',
          ],
        },
        {
          title: 'Structure and prerequisites',
          content: 'Duration: Typically 3 days including pool and open water sessions. Prerequisite: EFR (or equivalent) and Open Water certification.',
        },
        {
          title: 'Inclusions',
          content: [
            'Course materials and certification',
            'Rescue skills training in pool and open water',
            'All equipment rental',
          ],
        },
      ]}
      faqs={[
        {
          question: 'Is Rescue difficult?',
          answer: 'The course is challenging but instructors support you step-by-step. Good fitness and comfort in the water help.',
        },
      ]}
    />
  );
};

export default RescueEn;
