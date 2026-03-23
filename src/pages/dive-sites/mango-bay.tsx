import React from 'react';
import DiveSiteDetail from '@/components/DiveSiteDetail';
import { useTranslation } from 'react-i18next';

const MangoBay = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');

  const content = isDutch
    ? {
        overview: 'Ondiepe koraalriffen, perfect voor ontspannen duiken met een levendig marien ecosysteem.',
        quickFacts: {
          depth: '5-18m',
          difficulty: 'Beginner',
          location: 'Baai aan de westkust',
          bestTime: 'Hele jaar, beste bij rustig weer',
        },
        whatYouCanSee: [
          'Kleurrijke rifvissen',
          'Clownvissen en anemonen',
          'Papegaaivissen en lipvissen',
          'Vlindervissen',
          'Diverse keizersvissen',
          'Kleine rifhaaien'
        ],
        marineLifeHighlights: [
          'Gezond rifecosysteem',
          'Kleurrijke harde en zachte koralen',
          'Zeeanemonen',
          'Veel onderwaterleven'
        ],
        divingTips: [
          'Perfect voor beginners en trainingsduiken',
          import React from 'react';
          import DiveSiteDetail from '@/components/DiveSiteDetail';

          const MangoBay = () => {
            return (
              <DiveSiteDetail
                name="Mango Bay"
                overview="Shallow coral reefs perfect for relaxed diving with thriving marine ecosystems."
                quickFacts={{
                  depth: '5-18m',
                  difficulty: 'Beginner',
                  location: 'West coast bay',
                  bestTime: 'Year-round, best during calm weather',
                }}
                whatYouCanSee={[
                  'Colorful reef fish',
                  'Clownfish and anemones',
                  'Parrotfish and wrasse',
                  'Butterflyfish',
                  'Angelfish species',
                  'Small reef sharks'
                ]}
                marineLifeHighlights={[
                  'Healthy reef ecosystem',
                  'Colorful hard and soft corals',
                  'Sea anemones',
                  'Abundant marine life'
                ]}
                divingTips={[
                  'Perfect for beginners and training dives',
                  'Also excellent for snorkeling',
                  'Look for grazers in seagrass and reef life',
                  'Great spot for underwater photography',
                  'Calm water ideal for learning buoyancy',
                  'Multiple coral bommies to explore',
                  'Suitable for longer dives',
                  'Perfect for Open Water certification dives'
                ]}
                images={['/images/mango-bay.webp']}
              />
            );
          };

          export default MangoBay;

