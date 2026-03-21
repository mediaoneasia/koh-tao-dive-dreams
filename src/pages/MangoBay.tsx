import React from 'react';
// import DiveSiteDetail from '../components/DiveSiteDetail';
import { useTranslation } from 'react-i18next';

const MangoBay = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');

  const content = isDutch
    ? {
        description: "Ondiepe koraalriffen, perfect voor ontspannen duiken met een levendig marien ecosysteem.",
        difficulty: "Beginner",
        location: "Baai aan de westkust",
        highlights: ["Kleurrijk koraal", "Rifvissen", "Zeeanemonen"],
        detailedDescription:
          "Mango Bay is een mooie ondiepe duiklocatie aan de westkust van Koh Tao, ideaal voor beginners en duikers die rustig willen duiken. De site heeft een gezond rifecosysteem met kleurrijke harde en zachte koralen, zeeanemonen en veel onderwaterleven. Door de geringe diepte is de plek geschikt voor langere duiken en herhaalde verkenning van hetzelfde gebied. De beschutte ligging van de baai zorgt voor kalm water en goed zicht, waardoor het een uitstekende plek is om duikvaardigheden te leren en ontspannen van de onderwaterwereld te genieten.",
        bestTime: "Hele jaar, beste bij rustig weer",
        current: "Zeer licht, beschutte baai",
        visibility: "15-25m, goed zicht in beschut water",
        marineLife: [
          "Kleurrijke rifvissen",
          "Clownvissen en anemonen",
          "Papegaaivissen en lipvissen",
          "Vlindervissen",
          "Diverse keizersvissen",
          "Kleine rifhaaien"
        ],
        tips: [
          "Perfect voor beginners en trainingsduiken",
          "Ook uitstekend geschikt om te snorkelen",
          "Kijk uit naar grazers in zeegras en rifleven",
          "Mooie plek voor onderwaterfotografie",
          "Rustig water ideaal om drijfvermogen te leren",
          "Meerdere koraalbommies om te verkennen",
          "Geschikt voor langere duiken",
          "Perfect voor Open Water-brevetduiken"
        ]
      }
    : {
        description: "Shallow coral reefs perfect for relaxed diving with thriving marine ecosystems.",
        difficulty: "Beginner",
        location: "West coast bay",
        highlights: ["Colorful Corals", "Reef Fish", "Sea Anemones"],
        detailedDescription:
          "Mango Bay is a beautiful shallow dive site located on Koh Tao's west coast, perfect for beginner divers and those seeking a relaxed diving experience. The site features a thriving coral reef ecosystem with colorful hard and soft corals, sea anemones, and abundant marine life. The shallow depths make it ideal for extended dives and multiple visits to the same area. The bay's protected location provides calm waters and excellent visibility, making it perfect for learning diving skills and enjoying the underwater world at a comfortable pace.",
        bestTime: "Year-round, best during calm weather",
        current: "Very light, protected bay location",
        visibility: "15-25m, good clarity in protected waters",
        marineLife: [
          "Colorful reef fish",
          "Clownfish and anemones",
          "Parrotfish and wrasse",
          "Butterflyfish",
          "Angelfish species",
          "Small reef sharks"
        ],
        tips: [
          "Perfect for beginner divers and training",
          "Excellent for snorkeling as well",
          "Look for seagrass grazers and reef life",
          "Great for underwater photography",
          "Calm waters ideal for learning buoyancy",
          "Multiple coral bommies to explore",
          "Good site for extended dives",
          "Perfect for Open Water certification dives"
        ]
      };

  return (
    {/* <DiveSiteDetail
      name="Mango Bay"
      description={content.description}
      depth="5-18m"
      difficulty={content.difficulty}
      location={content.location}
      highlights={content.highlights}
      detailedDescription={content.detailedDescription}
      bestTime={content.bestTime}
      current={content.current}
      visibility={content.visibility}
      marineLife={content.marineLife}
      tips={content.tips}
      fullHeightHero={true}
      noOverlay={true}
      secondaryImage="/images/3turtle.png"
      images={[
        "/images/mango-bay.webp",
        "/images/photo-1613853250147-2f73e55c1561.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    /> */}
  );
};

export default MangoBay;