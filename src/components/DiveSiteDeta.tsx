
import React from 'react';

interface DiveSiteDetailProps {
  name: string;
  overview: string;
  quickFacts: {
    depth: string;
    difficulty: string;
    location: string;
    bestTime: string;
  };
  whatYouCanSee: string[];
  marineLifeHighlights: string[];
  divingTips: string[];
  images: string[];
}

const DiveSiteDetail: React.FC<DiveSiteDetailProps> = ({
  name,
  overview,
  quickFacts,
  whatYouCanSee,
  marineLifeHighlights,
  divingTips,
  images
}) => {
  return (
    <div style={{ padding: 24 }}>
      <h1>{name}</h1>
      <p><strong>Overview:</strong> {overview}</p>
      <div>
        <strong>Quick Facts:</strong>
        <ul>
          <li>Depth: {quickFacts.depth}</li>
          <li>Difficulty: {quickFacts.difficulty}</li>
          <li>Location: {quickFacts.location}</li>
          <li>Best Time: {quickFacts.bestTime}</li>
        </ul>
      </div>
      <div>
        <strong>What You Can See:</strong>
        <ul>
          {whatYouCanSee.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      </div>
      <div>
        <strong>Marine Life Highlights:</strong>
        <ul>
          {marineLifeHighlights.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      </div>
      <div>
        <strong>Diving Tips:</strong>
        <ul>
          {divingTips.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      </div>
      <div>
        <strong>Gallery:</strong>
        <div style={{ display: 'flex', gap: 8 }}>
          {images.map((img, idx) => (
            <img key={idx} src={img} alt={name + ' ' + (idx + 1)} style={{ width: 180, height: 120, objectFit: 'cover', borderRadius: 8 }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiveSiteDetail;