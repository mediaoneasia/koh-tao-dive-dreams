import React from 'react';
import CoursePageTemplate from '@/components/CoursePageTemplate';

const DiscoverScubaEn: React.FC = () => {
  return (
    <CoursePageTemplate
      pageSlug="discover-scuba"
      locale="en"
      fallbackContent={{
        hero_title: 'Discover Scuba Diving (DSD)',
        hero_subtitle: 'Explore the thrill of breathing underwater with no certification required. This beginner program is the perfect first dive experience on Koh Tao.',
        course_overview: 'Discover Scuba Diving is designed for non-certified divers who want to safely experience real scuba diving with a professional instructor. You start with a simple briefing and essential skills in confined water, then continue to shallow open water for your first dive.',
        price_thb: '2500',
        price_usd: '72',
        price_eur: '66',
        duration: '1 day',
      }}
      heroImage="/images/discover-scuba-dsd.png"
      level="Beginner"
      bookingItemName="Discover Scuba Diving"
      bookingType="dive"
      sections={[
        {
          title: 'How it works',
          content: [
            'Step 1: Briefing and skills in confined water',
            'Step 2: First open water dive with close supervision',
          ],
        },
        {
          title: 'What is included',
          content: [
            'Certified scuba dive professional',
            'Use of all scuba equipment',
            'Maximum 4 guests per instructor group',
            'Option to add extra dives',
          ],
        },
      ]}
      faqs={[
        {
          question: 'What is Discover Scuba Diving (DSD)?',
          answer: 'DSD is a beginner experience that allows non-certified divers to try scuba diving in a controlled and supervised environment before committing to a full course.',
        },
        {
          question: 'Do I need a certification to join DSD?',
          answer: 'No. DSD is specifically designed for first-time divers and beginners.',
        },
        {
          question: 'What can I expect on the day?',
          answer: 'You will receive a short orientation, safety briefing and basic skills coaching before going for your first open water dive with your instructor.',
        },
        {
          question: 'What is the DSD Deluxe option?',
          answer: 'Deluxe is an extended experience with extra dives and more underwater time, ideal if you want a deeper introduction before starting Open Water.',
        },
      ]}
    />
  );
};

export default DiscoverScubaEn;
