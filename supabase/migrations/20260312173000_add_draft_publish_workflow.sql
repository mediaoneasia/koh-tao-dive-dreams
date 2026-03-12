-- Add draft/publish workflow support to page metadata
ALTER TABLE page_metadata
  ADD COLUMN IF NOT EXISTS draft_status TEXT NOT NULL DEFAULT 'published',
  ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE;

-- Keep draft_status constrained to known values
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'page_metadata_draft_status_check'
  ) THEN
    ALTER TABLE page_metadata
      ADD CONSTRAINT page_metadata_draft_status_check
      CHECK (draft_status IN ('draft', 'published'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_page_metadata_draft_status ON page_metadata(draft_status);

-- Draft table stores staged content edits before publishing
CREATE TABLE IF NOT EXISTS public.page_content_drafts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_slug TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'en',
  section_key TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'text',
  content_value TEXT NOT NULL,
  updated_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(page_slug, locale, section_key)
);

ALTER TABLE public.page_content_drafts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read page_content_drafts"
  ON public.page_content_drafts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to manage page_content_drafts"
  ON public.page_content_drafts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_page_content_drafts_lookup
  ON public.page_content_drafts(page_slug, locale, section_key);

CREATE TRIGGER update_page_content_drafts_updated_at
  BEFORE UPDATE ON public.page_content_drafts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
