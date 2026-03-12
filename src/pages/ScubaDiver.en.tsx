import React from 'react';
import CoursePageTemplate from '@/components/CoursePageTemplate';

const ScubaDiverEn: React.FC = () => {
  return (
    <CoursePageTemplate
      pageSlug="scuba-diver"
      locale="en"
      fallbackContent={{
        hero_title: 'PADI Scuba Diver Course',
        hero_subtitle: 'Experience the underwater world with confidence. The PADI Scuba Diver course is perfect for those who want to try scuba diving before committing to full certification.',
        course_overview: "The PADI Scuba Diver course introduces you to the underwater world in a fun and relaxed way. You'll learn basic scuba diving skills and explore shallow reefs, giving you the confidence to continue your diving journey. This course serves as an introduction to scuba diving and can lead to full Open Water certification.",
        price_thb: '8500',
        price_usd: '245',
        price_eur: '225',
        duration: '2-3 days',
      }}
      heroImage="/images/openwater/openwater.jpg"
      level="Entry Level"
      bookingItemName="PADI Scuba Diver Course"
      sections={[
        {
          title: "What you'll learn",
          content: [
            'Basic scuba diving theory and physics',
            'Proper use of scuba equipment',
            'Fundamental diving skills and safety procedures',
            'Underwater communication and buddy system',
            'Shallow water exploration and reef appreciation',
            'Environmental awareness and marine conservation',
          ],
        },
        {
          title: 'Course structure',
          content: "The course includes classroom sessions, confined water training, and open water dives. You'll complete 2 open water dives in waters no deeper than 12 meters (40 feet), making it accessible for most people.",
        },
        {
          title: 'Why choose Scuba Diver?',
          content: [
            'Shorter commitment than full Open Water course',
            'Perfect introduction to scuba diving',
            'Can be upgraded to Open Water certification',
            'Fun and relaxed learning environment',
            'Explore beautiful Koh Tao reefs',
          ],
        },
      ]}
    />
  );
};

export default ScubaDiverEn;