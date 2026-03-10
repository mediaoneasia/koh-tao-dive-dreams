import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Save, RefreshCw } from 'lucide-react';
import { hasAdminAccess } from '@/lib/adminAccess';

interface PageContentEditorProps {
  pageSlug: string;
  locale: string;
}

interface ContentItem {
  section_key: string;
  content_value: string;
  content_type: string;
  label: string;
}

const PAGE_DEFINITIONS: Record<string, ContentItem[]> = {
  'open-water': [
    { section_key: 'hero_title', content_value: 'PADI Open Water Course', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: "The world's most popular scuba course. Learn the fundamentals and get certified to dive independently to 18 metres/60 feet.", content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'course_overview', content_value: 'The Open Water course combines knowledge development, confined water dives (pool) and open water dives.', content_type: 'text', label: 'Course Overview' },
    { section_key: 'price_thb', content_value: '11000', content_type: 'text', label: 'Price (THB)' },
    { section_key: 'price_usd', content_value: '320', content_type: 'text', label: 'Price (USD)' },
    { section_key: 'price_eur', content_value: '290', content_type: 'text', label: 'Price (EUR)' },
    { section_key: 'duration', content_value: '3-4 days', content_type: 'text', label: 'Duration' },
  ],
  'advanced': [
    { section_key: 'hero_title', content_value: 'PADI Advanced Open Water Course', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'Expand your skills with adventure dives. Explore deeper depths, improve navigation, and try specialties.', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'course_overview', content_value: 'The Advanced course consists of 5 adventure dives, including deep and navigation (required), plus 3 electives of your choice.', content_type: 'text', label: 'Course Overview' },
    { section_key: 'price_thb', content_value: '9500', content_type: 'text', label: 'Price (THB)' },
    { section_key: 'price_usd', content_value: '275', content_type: 'text', label: 'Price (USD)' },
    { section_key: 'price_eur', content_value: '250', content_type: 'text', label: 'Price (EUR)' },
    { section_key: 'duration', content_value: '2 days', content_type: 'text', label: 'Duration' },
  ],
  'rescue': [
    { section_key: 'hero_title', content_value: 'PADI Rescue Diver Course', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'Learn to prevent and manage dive emergencies. Essential skills for any serious diver.', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'course_overview', content_value: 'Build confidence in handling emergencies underwater and at the surface through realistic rescue scenarios.', content_type: 'text', label: 'Course Overview' },
    { section_key: 'price_thb', content_value: '12500', content_type: 'text', label: 'Price (THB)' },
    { section_key: 'price_usd', content_value: '360', content_type: 'text', label: 'Price (USD)' },
    { section_key: 'price_eur', content_value: '330', content_type: 'text', label: 'Price (EUR)' },
    { section_key: 'duration', content_value: '3 days', content_type: 'text', label: 'Duration' },
  ],
  'efr': [
    { section_key: 'hero_title', content_value: 'Emergency First Response (EFR)', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'Learn CPR, first aid, and emergency response. Required for Rescue Diver certification.', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'course_overview', content_value: 'Practice primary and secondary care skills including bandaging, splinting, and emergency assessments.', content_type: 'text', label: 'Course Overview' },
    { section_key: 'price_thb', content_value: '4500', content_type: 'text', label: 'Price (THB)' },
    { section_key: 'price_usd', content_value: '130', content_type: 'text', label: 'Price (USD)' },
    { section_key: 'price_eur', content_value: '120', content_type: 'text', label: 'Price (EUR)' },
    { section_key: 'duration', content_value: '1 day', content_type: 'text', label: 'Duration' },
  ],
  'divemaster': [
    { section_key: 'hero_title', content_value: 'PADI Divemaster Course', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'Begin your professional diving career. Learn leadership, supervision and dive management skills.', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'course_overview', content_value: 'Develops dive leadership skills including supervising activities, assisting instructors, and guiding certified divers.', content_type: 'text', label: 'Course Overview' },
    { section_key: 'price_thb', content_value: '41000', content_type: 'text', label: 'Price (THB)' },
    { section_key: 'price_usd', content_value: '1190', content_type: 'text', label: 'Price (USD)' },
    { section_key: 'price_eur', content_value: '1090', content_type: 'text', label: 'Price (EUR)' },
    { section_key: 'duration', content_value: '2-4 weeks', content_type: 'text', label: 'Duration' },
  ],
  'instructor': [
    { section_key: 'hero_title', content_value: 'PADI Instructor Development Course (IDC)', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'Become a PADI Instructor. Transform your passion into a career teaching scuba diving.', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'course_overview', content_value: 'Comprehensive training in teaching methodology, dive theory, and student management. Prepares you for the IE.', content_type: 'text', label: 'Course Overview' },
    { section_key: 'price_thb', content_value: '59000', content_type: 'text', label: 'Price (THB)' },
    { section_key: 'price_usd', content_value: '1710', content_type: 'text', label: 'Price (USD)' },
    { section_key: 'price_eur', content_value: '1560', content_type: 'text', label: 'Price (EUR)' },
    { section_key: 'duration', content_value: '2-3 weeks', content_type: 'text', label: 'Duration' },
  ],
  'discover-scuba': [
    { section_key: 'hero_title', content_value: 'Discover Scuba Diving', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'Try scuba diving for the first time. No experience necessary!', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'course_overview', content_value: 'A quick introduction to scuba diving. Pool practice followed by a shallow ocean dive.', content_type: 'text', label: 'Course Overview' },
    { section_key: 'price_thb', content_value: '2900', content_type: 'text', label: 'Price (THB)' },
    { section_key: 'price_usd', content_value: '85', content_type: 'text', label: 'Price (USD)' },
    { section_key: 'price_eur', content_value: '78', content_type: 'text', label: 'Price (EUR)' },
    { section_key: 'duration', content_value: 'Half day', content_type: 'text', label: 'Duration' },
  ],
  'scuba-diver': [
    { section_key: 'hero_title', content_value: 'PADI Scuba Diver Certification', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: 'Get certified in just 2 days. Perfect for those with limited time.', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'course_overview', content_value: 'A shorter version of Open Water. Certifies you to dive with a professional to 12 meters.', content_type: 'text', label: 'Course Overview' },
    { section_key: 'price_thb', content_value: '8500', content_type: 'text', label: 'Price (THB)' },
    { section_key: 'price_usd', content_value: '245', content_type: 'text', label: 'Price (USD)' },
    { section_key: 'price_eur', content_value: '225', content_type: 'text', label: 'Price (EUR)' },
    { section_key: 'duration', content_value: '2 days', content_type: 'text', label: 'Duration' },
  ],
  'scuba-review': [
    { section_key: 'hero_title', content_value: 'Scuba Review / ReActivate', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: "Haven't dived in a while? Refresh your skills with a professional instructor.", content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'course_overview', content_value: 'Quick knowledge review followed by confined and open water skill practice.', content_type: 'text', label: 'Course Overview' },
    { section_key: 'price_thb', content_value: '3500', content_type: 'text', label: 'Price (THB)' },
    { section_key: 'price_usd', content_value: '100', content_type: 'text', label: 'Price (USD)' },
    { section_key: 'price_eur', content_value: '92', content_type: 'text', label: 'Price (EUR)' },
    { section_key: 'duration', content_value: '1 day', content_type: 'text', label: 'Duration' },
  ],
};

export const PageContentEditor: React.FC<PageContentEditorProps> = ({ pageSlug, locale }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAdmin(user ? hasAdminAccess(user) : false);
    };
    checkAdmin();
  }, []);

  useEffect(() => {
    const loadContent = async () => {
      const template = PAGE_DEFINITIONS[pageSlug] || [];
      
      try {
        // @ts-expect-error - page_content table will be available after migration
        const { data, error } = await supabase
          .from('page_content')
          .select('section_key, content_value, content_type')
          .eq('page_slug', pageSlug)
          .eq('locale', locale);

        if (error) throw error;

        const loadedItems = template.map((item) => {
          const dbItem = data?.find((d: any) => d.section_key === item.section_key);
          return {
            ...item,
            content_value: dbItem?.content_value || item.content_value,
          };
        });

        setContentItems(loadedItems);
      } catch (err) {
        console.error('Failed to load content:', err);
        toast.error('Failed to load page content');
        setContentItems(template);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [pageSlug, locale]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const upserts = contentItems.map((item) => ({
        page_slug: pageSlug,
        locale,
        section_key: item.section_key,
        content_type: item.content_type,
        content_value: item.content_value,
        updated_by: user?.email || null,
      }));

      // @ts-expect-error - page_content table will be available after migration
      const { error } = await supabase
        .from('page_content')
        .upsert(upserts, { onConflict: 'page_slug,locale,section_key' });

      if (error) throw error;

      toast.success('Page content saved successfully');
    } catch (err) {
      console.error('Failed to save content:', err);
      toast.error('Failed to save page content');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (sectionKey: string, value: string) => {
    setContentItems((prev) =>
      prev.map((item) =>
        item.section_key === sectionKey ? { ...item, content_value: value } : item
      )
    );
  };

  if (!isAdmin) return null;
  if (isLoading) return <div className="p-4">Loading editor...</div>;

  return (
    <Card className="mt-8 border-yellow-300 bg-yellow-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="w-5 h-5" />
          Page Content Editor
        </CardTitle>
        <CardDescription>
          Admin-only: Edit page content for {pageSlug} ({locale})
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {contentItems.map((item) => (
          <div key={item.section_key} className="space-y-2">
            <Label htmlFor={item.section_key}>{item.label}</Label>
            {item.content_type === 'text' && item.content_value.length < 150 ? (
              <Input
                id={item.section_key}
                value={item.content_value}
                onChange={(e) => handleChange(item.section_key, e.target.value)}
                className="bg-white"
              />
            ) : (
              <Textarea
                id={item.section_key}
                value={item.content_value}
                onChange={(e) => handleChange(item.section_key, e.target.value)}
                rows={4}
                className="bg-white"
              />
            )}
          </div>
        ))}
        <Button onClick={handleSave} disabled={isSaving} className="w-full">
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </CardContent>
    </Card>
  );
};
