
import React, { useState, useEffect } from 'react';
import DiveSiteDetail from '@/components/DiveSiteDetail';
import { useTranslation } from 'react-i18next';


// Fallback hardcoded content if WP fetch fails
const getFallbackContent = (isDutch: boolean) => isDutch
  ? {
      overview: "Chumphon Pinnacle is een van de meest spectaculaire diepduiklocaties van Koh Tao, op ongeveer 30 minuten varen uit de kust. Deze granieten pinnacle rijst steil op vanaf de oceaanbodem en vormt een natuurlijke schoonmaakplek voor grote zeedieren. De locatie staat vooral bekend om betrouwbare walvishaaiwaarnemingen, waarbij deze zachte reuzen regelmatig door de diepte cruisen. Grote scholen trevally en chevron-barracuda zorgen voor indrukwekkende scenes, terwijl adelaarsroggen en andere pelagische soorten extra dynamiek geven. De structuur van de pinnacle biedt ook mooie doorgangen en sterke fotomogelijkheden.",
      quickFacts: { depth: '15-30m', difficulty: 'Gevorderd', location: '30 minuten uit de kust', bestTime: 'Hele jaar, piekseizoen december-april' },
      whatYouCanSee: ["Walvishaaien", "Scholen trevally", "Adelaarsroggen", "Chevron-barracuda"],
      marineLifeHighlights: [
        "Walvishaaien (regelmatige waarnemingen)",
        "Grote scholen giant trevally",
        "Chevron-barracuda",
        "Adelaarsroggen",
        "Scholen horsmakreel en fusilier",
        "Reuzenbarracuda",
        "Kingfish",
        "Diverse rifvissen"
      ],
      divingTips: [
        "Gevorderde certificering aanbevolen door diepte en stroming",
        "Vroege ochtendtrips vergroten kans op wildlife-waarnemingen",
        "Groothoeklens aanbevolen voor grote onderwerpen",
        "Blijf bij je gids bij matige stroming",
        "Perfect voor specialisaties in diepduiken",
        "Walvishaaien zijn vaak actiever bij opkomend tij",
        "Neem een goede onderwatercamera mee"
      ],
      images: [
        "/images/chumphon-pinnacle-top.webp",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1613853250147-2f73e55c1561.avif",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]
    }
  : {
      overview: "Chumphon Pinnacle is one of Koh Tao's most spectacular deep dive sites, located 30 minutes offshore. This granite pinnacle rises dramatically from the deep ocean floor, creating a natural cleaning station for large marine life. The site is particularly famous for its reliable whaleshark sightings, with these gentle giants often cruising the depths. Massive schools of trevally and chevron barracuda create mesmerizing displays, while eagle rays and other pelagics add to the excitement. The pinnacle's structure provides excellent swim-through opportunities and photographic subjects.",
      quickFacts: { depth: '15-30m', difficulty: 'Advanced', location: '30 minutes offshore', bestTime: 'Year-round, peak season December-April' },
      whatYouCanSee: ["Whalesharks", "Trevally Schools", "Eagle Rays", "Chevron Barracuda"],
      marineLifeHighlights: [
        "Whalesharks (regular sightings)",
        "Giant Trevally schools",
        "Chevron Barracuda",
        "Eagle Rays",
        "Scad and Fusilier schools",
        "Giant Barracuda",
        "Kingfish",
        "Various reef fish species"
      ],
      divingTips: [
        "Advanced certification recommended due to depth and current",
        "Early morning departures maximize wildlife sightings",
        "Wide-angle photography lens recommended for large subjects",
        "Stay with your dive guide in moderate currents",
        "Perfect for deep diving specialty courses",
        "Whalesharks are most active during incoming tides",
        "Bring a good quality underwater camera"
      ],
      images: [
        "/images/chumphon-pinnacle-top.webp",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1613853250147-2f73e55c1561.avif",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]
    };


import { supabase } from '@/integrations/supabase/client';
import { hasAdminAccess } from '@/lib/adminAccess';

// Local useAdmin hook (not imported)
const useAdmin = () => {
  const [user, setUser] = React.useState(null);
  const [isAdmin, setIsAdmin] = React.useState(false);
  React.useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setIsAdmin(user ? hasAdminAccess(user) : false);
    };
    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null;
      setUser(user);
      setIsAdmin(user ? hasAdminAccess(user) : false);
    });
    return () => { subscription.unsubscribe(); };
  }, []);
  return { user, isAdmin };
};

const WP_SLUG = 'chumphon-pinnacle';
const WP_API = 'https://divinginasia.com/wp-json/wp/v2/pages?slug=' + WP_SLUG;

const ChumphonPinnacle = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');
  const [content, setContent] = useState(getFallbackContent(isDutch));
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    overview: content.overview,
    depth: content.quickFacts.depth,
    difficulty: content.quickFacts.difficulty,
    location: content.quickFacts.location,
    bestTime: content.quickFacts.bestTime,
    whatYouCanSee: content.whatYouCanSee.join(', '),
    marineLifeHighlights: content.marineLifeHighlights.join('\n'),
    divingTips: content.divingTips.join('\n'),
  });
  const { user, isAdmin } = useAdmin();

  useEffect(() => {
    setLoading(true);
    fetch(WP_API)
      .then((res) => res.ok ? res.json() : Promise.reject('WP fetch failed'))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Parse WP content. Assumes ACF or custom fields for structure, fallback to fallbackContent if not found
          const wp = data[0];
          // Example: expects ACF fields for all content, fallback to fallbackContent if not found
          const acf = wp.acf || {};
          setContent({
            overview: acf.overview || wp.excerpt?.rendered?.replace(/<[^>]+>/g, '') || getFallbackContent(isDutch).overview,
            quickFacts: acf.quickFacts || getFallbackContent(isDutch).quickFacts,
            whatYouCanSee: acf.whatYouCanSee || getFallbackContent(isDutch).whatYouCanSee,
            marineLifeHighlights: acf.marineLifeHighlights || getFallbackContent(isDutch).marineLifeHighlights,
            divingTips: acf.divingTips || getFallbackContent(isDutch).divingTips,
            images: acf.images || getFallbackContent(isDutch).images,
          });
        }
        setLoading(false);
      })
      .catch(() => {
        setContent(getFallbackContent(isDutch));
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  // Update form when content changes (for admin edit)
  useEffect(() => {
    setForm({
      overview: content.overview,
      depth: content.quickFacts.depth,
      difficulty: content.quickFacts.difficulty,
      location: content.quickFacts.location,
      bestTime: content.quickFacts.bestTime,
      whatYouCanSee: content.whatYouCanSee.join(', '),
      marineLifeHighlights: content.marineLifeHighlights.join('\n'),
      divingTips: content.divingTips.join('\n'),
    });
  }, [content]);

  const handleEdit = () => setEditing(true);
  const handleCancel = () => setEditing(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSave = () => {
    setContent({
      ...content,
      overview: form.overview,
      quickFacts: {
        depth: form.depth,
        difficulty: form.difficulty,
        location: form.location,
        bestTime: form.bestTime,
      },
      whatYouCanSee: form.whatYouCanSee.split(',').map((s) => s.trim()).filter(Boolean),
      marineLifeHighlights: form.marineLifeHighlights.split('\n').map((s) => s.trim()).filter(Boolean),
      divingTips: form.divingTips.split('\n').map((s) => s.trim()).filter(Boolean),
    });
    setEditing(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="flex justify-end mb-4">
        {!editing && isAdmin && (
          <button
            onClick={handleEdit}
            className="bg-blue-600 text-white rounded-md px-5 py-2 font-semibold"
          >
            Edit
          </button>
        )}
      </div>
      {editing ? (
        <div className="max-w-[700px] mx-auto bg-slate-50 rounded-lg p-6 shadow-md">
          <h2 className="font-bold text-2xl mb-4">Edit Chumphon Pinnacle</h2>
          <div className="mb-3">
            <label>Overview:<br />
              <textarea
                name="overview"
                value={form.overview}
                onChange={handleChange}
                rows={3}
                className="w-full border rounded p-2"
              />
            </label>
          </div>
          <div className="mb-3 flex gap-2">
            <label className="flex-1">Depth:<br />
              <input
                name="depth"
                value={form.depth}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </label>
            <label className="flex-1">Difficulty:<br />
              <input
                name="difficulty"
                value={form.difficulty}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </label>
          </div>
          <div className="mb-3 flex gap-2">
            <label className="flex-1">Location:<br />
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </label>
            <label className="flex-1">Best Time:<br />
              <input
                name="bestTime"
                value={form.bestTime}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </label>
          </div>
          <div className="mb-3">
            <label>What You Can See (comma separated):<br />
              <input
                name="whatYouCanSee"
                value={form.whatYouCanSee}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </label>
          </div>
          <div className="mb-3">
            <label>Marine Life Highlights (one per line):<br />
              <textarea
                name="marineLifeHighlights"
                value={form.marineLifeHighlights}
                onChange={handleChange}
                rows={4}
                className="w-full border rounded p-2"
              />
            </label>
          </div>
          <div className="mb-3">
            <label>Diving Tips (one per line):<br />
              <textarea
                name="divingTips"
                value={form.divingTips}
                onChange={handleChange}
                rows={4}
                className="w-full border rounded p-2"
              />
            </label>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white rounded-md px-5 py-2 font-semibold"
            >Save</button>
            <button
              onClick={handleCancel}
              className="bg-pink-700 text-white rounded-md px-5 py-2 font-semibold"
            >Cancel</button>
          </div>
        </div>
      ) : (
        <DiveSiteDetail
          name="Chumphon Pinnacle"
          overview={content.overview}
          quickFacts={content.quickFacts}
          whatYouCanSee={content.whatYouCanSee}
          marineLifeHighlights={content.marineLifeHighlights}
          divingTips={content.divingTips}
          images={content.images}
        />
      )}
    </>
  );
};

export default ChumphonPinnacle;
