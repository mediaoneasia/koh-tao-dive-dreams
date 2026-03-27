import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PageContent {
  [key: string]: string;
}

interface UsePageContentOptions {
  pageSlug: string;
  locale: string;
  fallbackContent: PageContent;
}

export function usePageContent({ pageSlug, locale, fallbackContent }: UsePageContentOptions) {
  const [content, setContent] = useState<PageContent>(fallbackContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const mergeAndSet = (rows: any[] | null | undefined) => {
          if (rows && rows.length > 0) {
            const dbContent: PageContent = {};
            rows.forEach((row: any) => {
              dbContent[row.section_key] = row.content_value;
            });
            setContent({ ...fallbackContent, ...dbContent });
            return true;
          }
          return false;
        };

        const apiUrl = `/api/get-page-content?page_slug=${encodeURIComponent(pageSlug)}&locale=${encodeURIComponent(locale)}&t=${Date.now()}`;
        const res = await fetch(apiUrl);
        if (res.ok) {
          try {
            const result = await res.json();
            if (mergeAndSet(result?.content)) return;
          } catch {
            // Ignore invalid JSON and fallback to direct Supabase query.
          }
        }

        const { data, error } = await supabase
          .from('page_content')
          .select('section_key, content_value')
          .eq('page_slug', pageSlug)
          .eq('locale', locale)
          .order('section_key', { ascending: true });

        if (error) {
          console.error('Supabase fallback fetch failed:', error.message);
          setContent(fallbackContent);
          return;
        }

        if (!mergeAndSet(data)) {
          setContent(fallbackContent);
        }
      } catch (err) {
        console.error('Failed to fetch page content:', err);
        setContent(fallbackContent);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, [pageSlug, locale, fallbackContent]);

  return { content, isLoading };
}
