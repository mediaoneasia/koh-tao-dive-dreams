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
    { section_key: 'hero_title', content_value: '', content_type: 'text', label: 'Hero Title' },
    { section_key: 'hero_subtitle', content_value: '', content_type: 'text', label: 'Hero Subtitle' },
    { section_key: 'course_overview', content_value: '', content_type: 'text', label: 'Course Overview' },
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
