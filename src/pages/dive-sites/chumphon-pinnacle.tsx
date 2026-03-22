import React, { useEffect, useState } from 'react';
import { createClient } from 'contentful';
import { useTranslation } from 'react-i18next';
import DiveSiteDetail from '@/components/DiveSiteDetail';

const client = createClient({
  space: '5uphqssjz3hc',
  accessToken: 'FychplmXWcmvE85YBhlKXGvFfR5sgJGWMyF9cirU--4',
});

export default function ChumphonPinnaclePage() {
  const { i18n } = useTranslation();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDiveSite = async () => {
      const locale = i18n.language.startsWith('nl') ? 'nl' : 'en-US';
      const entries = await client.getEntries({
        content_type: 'diveSite', // Use your Content Model ID
        'fields.slug': 'chumphon-pinnacle', // Use your slug field value
        locale,
      });
      if (entries.items.length > 0) {
        setData(entries.items[0].fields);
      }
    };
    fetchDiveSite();
  }, [i18n.language]);

  if (!data) return <div>Loading…</div>;

  return (
    <div className="px-4 md:px-8">
      <DiveSiteDetail
        name={data.name}
        overview={data.overview}
        quickFacts={{
          depth: data.depth,
          difficulty: data.difficulty,
          location: data.location,
          bestTime: data.bestTime,
        }}
        whatYouCanSee={data.whatYouCanSee}
        marineLifeHighlights={data.marineLifeHighlights}
        divingTips={data.divingTips}
        images={data.images.map(img => img.fields.file.url)}
      />
    </div>
  );
}
