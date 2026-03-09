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
        // @ts-expect-error - page_content table will be available after migration
        const { data, error } = await supabase
          .from('page_content')
          .select('section_key, content_value')
          .eq('page_slug', pageSlug)
          .eq('locale', locale);

        if (error) {
          console.error('Error fetching page content:', error);
          setContent(fallbackContent);
          return;
        }

        if (data && data.length > 0) {
          const dbContent: PageContent = {};
          data.forEach((row: any) => {
            dbContent[row.section_key] = row.content_value;
          });

          // Merge DB content with fallback (DB takes precedence)
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
