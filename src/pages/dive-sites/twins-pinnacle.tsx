import React from 'react';
import DiveSiteDetail from '@/components/DiveSiteDetail';

const TwinsPinnacle = () => {
  return (
    <DiveSiteDetail
      name="Twins Pinnacle"
      overview="Twins Pinnacle is the most popular dive site on Koh Tao, featuring three granite pinnacles, abundant marine life, and suitable for all certification levels."
      quickFacts={{
        depth: '6-18m',
        difficulty: 'Beginner to Intermediate',
        location: 'West coast of Koh Nang Yuan',
        bestTime: 'Year-round, best November-May',
      }}
      whatYouCanSee={[
        'Saddleback clownfish and Sebae anemones',
        'Nudibranchs',
        'Pipefish',
        'Yellow boxfish',
        'Longface emperor',
        'White’s butterflyfish',
        'Angelfish',
        'Reef fish',
        'Moray eels',
        'Trevally',
        'Bluespotted ribbon tail ray',
        'Snapper',
        'Groupers',
        'Parrotfish',
        'Bannerfish',
        'Sea turtles',
        'Scribbled filefish',
        'Anemonefish',
        'Boxfish and wart slugs'
      ]}
      marineLifeHighlights={[
        'Three granite pinnacles',
        'Arch and rock formations',
        'Rich marine life',
        'Perfect for training',
        'Calm conditions',
        'Anemones with clownfish'
      ]}
      divingTips={[
        'Perfect for Open Water divers and training dives',
        'Explore the deeper west pinnacle first',
        'Navigate to the middle pinnacle and check the arch on the north side',
        'Look under overhangs at the shallow pinnacle',
        'Don’t miss the famous clownfish with Sebae anemone',
        'Note: there is a stone circle around the clownfish – do not enter',
        'Great for macro photography',
        'Practice buoyancy on the arch and rock formations',
        'Nearby Buoyancy World is dedicated to buoyancy skills',
        'Excellent for marine awareness',
        'Easy navigation thanks to the three peaks'
      ]}
      images={['/images/twins-header.png']}
    />
  );
};

export default TwinsPinnacle;

export default TwinsPinnacle;
