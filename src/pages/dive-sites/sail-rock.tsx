import React from 'react';
import DiveSiteDetail from '@/components/DiveSiteDetail';
import { useTranslation } from 'react-i18next';

const SailRock = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');

  // English and Dutch content for each section
  const content = {
    en: {
      overview:
        "Sail Rock is widely regarded as one of the Gulf of Thailand's premier scuba diving sites. Located around 40 minutes offshore from Koh Tao, this granite pinnacle rises from deep blue water to just beneath the surface. The site is famous for the Chimney, a vertical swim-through that attracts pelagic life and creates dramatic underwater scenes. Massive schools of snapper, fusiliers, and barracuda are common, and whale sharks are regular visitors during the right conditions.",
      quickFacts: {
        depth: '18-40m',
        difficulty: 'Advanced',
        location: '40 minutes offshore',
        bestTime: 'Year-round, best December-May',
      },
      whatYouCanSee: ['Whale sharks', 'Giant barracuda', 'Malabar grouper', 'Sailfish'],
      marineLifeHighlights: [
        'Whale sharks (seasonal and occasional year-round sightings)',
        'Large schools of chevron and giant barracuda',
        'Malabar and marbled grouper around rock structure',
        'Eagle rays and fast-moving pelagics in blue water',
      ],
      divingTips: [
        'Advanced certification recommended due to depth and occasional current',
        'Stay close to your guide near the Chimney and blue-water edge',
        'Monitor depth and no-decompression time with a dive computer',
        'Morning dives often offer the best visibility and pelagic activity',
      ],
      images: ['/images/sailrock.webp'],
    },
    nl: {
      overview:
        'Sail Rock wordt gezien als een van de beste duiklocaties in de Golf van Thailand. Deze granieten rots ligt op ongeveer 40 minuten varen van Koh Tao en rijst vanuit diepblauw water tot vlak onder het oppervlak. De site is beroemd om de Chimney, een verticale doorgang die pelagische soorten aantrekt en voor spectaculaire duiken zorgt. Grote scholen snapper, fusilier en barracuda komen hier vaak voor, en walvishaaien worden regelmatig waargenomen in het juiste seizoen.',
      quickFacts: {
        depth: '18-40m',
        difficulty: 'Gevorderd',
        location: '40 minuten offshore',
        bestTime: 'Hele jaar, beste periode december-mei',
      },
      whatYouCanSee: ['Walvishaaien', 'Reuzenbarracuda', 'Malabar grouper', 'Zeilvis'],
      marineLifeHighlights: [
        'Walvishaaien (seizoensgebonden en soms het hele jaar door)',
        'Grote scholen chevron- en reuzenbarracuda',
        'Malabar- en gemarmerde tandbaars rond de rotsstructuur',
        'Adelaarsroggen en andere pelagische soorten in het blauwe water',
      ],
      divingTips: [
        'Gevorderde certificering aanbevolen door diepte en stroming',
        'Blijf dicht bij je gids bij de Chimney en blauwe-water-rand',
        'Gebruik een duikcomputer voor diepte en nultijdcontrole',
        'Ochtendduiken geven vaak het beste zicht en meeste pelagische actie',
      ],
      images: ['/images/sailrock.webp'],
    },
  };

  const locale = isDutch ? 'nl' : 'en';
  const data = content[locale];

  return (
    <div className="px-4 md:px-8">
      <DiveSiteDetail
        name="Sail Rock"
        overview={data.overview}
        quickFacts={data.quickFacts}
        whatYouCanSee={data.whatYouCanSee}
        marineLifeHighlights={data.marineLifeHighlights}
        divingTips={data.divingTips}
        images={data.images}
      />
    </div>
  );
};

export default SailRock;
