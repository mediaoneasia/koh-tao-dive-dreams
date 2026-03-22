import React from 'react';
import DiveSiteDetail from '@/components/DiveSiteDetail';

const JapaneseGardens = () => {
  return (
    <div className="px-4 md:px-8">
      <DiveSiteDetail
        name="Japanese Gardens"
        overview="Japanese Gardens is a beautiful dive site near Koh Nang Yuan, known for its diverse coral reef and abundant marine life. Suitable for all levels."
        quickFacts={{
          depth: '5-18m',
          difficulty: 'Beginner to Intermediate',
          location: 'Near Koh Nang Yuan',
          bestTime: 'Year-round, best visibility November–May',
        }}
        whatYouCanSee={[
          'Pink Tailed Triggerfish',
          'Ocellated Eagle Rays',
          'Colorful Corals',
          'Marbled Octopus',
        ]}
        marineLifeHighlights={[
          'Pink-tailed Triggerfish (unique to this site)',
          'Ocellated Eagle Rays',
          'Marbled Octopus',
          'Blue-ringed Octopus',
          'Nudibranchs and flatworms',
          'Parrotfish and wrasse',
          'Anthias and damselfish',
          'Moray eels and lionfish',
        ]}
        divingTips={[
          'Best time is November–May for visibility.',
          'Look for unique triggerfish and octopus.',
          'Great for underwater photography.',
        ]}
        images={['/images/japanandwins.jpg']}
      />
    </div>
  );
};

export default JapaneseGardens;
