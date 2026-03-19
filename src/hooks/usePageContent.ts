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
        const res = await fetch(`/api/get-page-content?page_slug=${encodeURIComponent(pageSlug)}&locale=${encodeURIComponent(locale)}&t=${Date.now()}`);
        if (!res.ok) {
          console.error('Error fetching page content:', res.statusText);
          setContent(fallbackContent);
          return;
        }
        const result = await res.json();
        const data = result.content;
        if (data && data.length > 0) {
          const dbContent: PageContent = {};
          data.forEach((row: any) => {
            dbContent[row.section_key] = row.content_value;
          });
          setContent({ ...fallbackContent, ...dbContent });
        } else {
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
