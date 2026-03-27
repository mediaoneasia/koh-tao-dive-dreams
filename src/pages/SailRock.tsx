import React from 'react';
import DiveSiteDetail from '../components/DiveSiteDetail';
import { useTranslation } from 'react-i18next';

const SailRock = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');

  const content = isDutch
    ? {
        overview: "Dé top-diepduiklocatie van Koh Tao met grote visscholen, walvishaaien en reuzenbarracuda's. Sail Rock wordt algemeen beschouwd als de beste duiksite in de Golf van Thailand. Deze imposante granieten rotspiek ligt op ongeveer 40 minuten varen van Koh Tao en stijgt op vanuit diepblauw water tot circa 18 meter onder het oppervlak. De site is beroemd om de 'Chimney': een verticale doorgang die een natuurlijke stroming creëert en grote pelagische vissen aantrekt. Walvishaaien worden hier regelmatig gezien, samen met enorme scholen snappers, fusiliers en chevron-barracuda's. Ook adelaarsroggen en zeilvissen verschijnen hier vaak, wat het een spectaculaire diepduikervaring maakt.",
        quickFacts: {
          depth: "18-40m",
          difficulty: "Gevorderd",
          location: "40 minuten uit de kust",
          bestTime: "Hele jaar, beste periode in droogseizoen (december-mei)"
        },
        whatYouCanSee: ["Walvishaaien", "Reuzenbarracuda", "Malabar tandbaars", "Zeilvis"],
        marineLifeHighlights: [
          "Walvishaaien (regelmatige waarnemingen)",
          "Scholen reuzenbarracuda",
          "Malabar tandbaars",
          "Zeilvis en adelaarsrog",
          "Chevron-barracuda",
          "Grote scholen snapper en fusilier",
          "Koningsmakreel",
          "Gemarmerde tandbaars"
        ],
        divingTips: [
          "Gevorderde certificering vereist - dit is een diepduiksite",
          "Stromingsbewustzijn is essentieel - blijf bij je gids",
          "Gebruik een duikcomputer voor nauwkeurige diepte- en tijdsbewaking",
          "Walvishaaien zijn vaak actiever in de ochtend - vroeg vertrek aanbevolen",
          "Neem een groothoeklens mee voor grote pelagische soorten",
          "Spaar lucht in verband met diepte en mogelijke stroming",
          "Perfect voor specialisaties in diepduiken"
        ]
      }
    : {
        overview:
          "Koh Tao's premier deep dive site featuring large schools of fish, whalesharks, and giant barracuda. Sail Rock is widely regarded as the Gulf of Thailand's premier scuba diving site. Located 40 minutes offshore, this impressive granite pinnacle rises from the deep blue ocean to within 18 meters of the surface. The site is famous for its 'Chimney' - a distinctive vertical swim-through that creates a natural vortex attracting large pelagic fish. Whalesharks are frequently sighted cruising the depths, and the site hosts massive schools of snapper, fusiliers, and chevron barracuda. Eagle rays and sailfish are also common visitors, making this a truly spectacular deep diving experience.",
        quickFacts: {
          depth: "18-40m",
          difficulty: "Advanced",
          location: "40 minutes offshore",
          bestTime: "Year-round, best in dry season (December-May)"
        },
        whatYouCanSee: ["Whalesharks", "Giant Barracuda", "Malabar Grouper", "Sailfish"],
        marineLifeHighlights: [
          "Whalesharks (frequent sightings)",
          "Giant Barracuda schools",
          "Malabar Grouper",
          "Sailfish and Eagle Rays",
          "Chevron Barracuda",
          "Large Snapper and Fusilier schools",
          "King Mackerel",
          "Brown Marbled Grouper"
        ],
        divingTips: [
          "Advanced certification required - this is a deep dive site",
          "Strong current awareness essential - stay with your guide",
          "Use a dive computer for accurate depth and time monitoring",
          "Whalesharks are most active in the morning - early boat departure recommended",
          "Bring a wide-angle lens for photographing large pelagics",
          "Conserve air due to depth and potential current",
          "Perfect for deep specialty course dives"
        ]
      };

  return (
    <DiveSiteDetail
      name="Sail Rock"
      overview={content.overview}
      quickFacts={content.quickFacts}
      whatYouCanSee={content.whatYouCanSee}
      marineLifeHighlights={content.marineLifeHighlights}
      divingTips={content.divingTips}
      images={[
        "/images/sailrock.webp",
        "/images/photo-1613853250147-2f73e55c1561.avif",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default SailRock;