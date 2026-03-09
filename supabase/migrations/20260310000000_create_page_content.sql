-- Create page_content table for admin-editable content
CREATE TABLE IF NOT EXISTS public.page_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_slug TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'en',
  section_key TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'text', -- text, richtext, html
  content_value TEXT NOT NULL,
  updated_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  UNIQUE(page_slug, locale, section_key)
);

-- Enable RLS
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

-- Public can read
CREATE POLICY "Allow public read access to page_content"
  ON public.page_content FOR SELECT
  USING (true);

-- Only authenticated users can insert/update
CREATE POLICY "Allow authenticated users to manage page_content"
  ON public.page_content FOR ALL
  USING (auth.role() = 'authenticated');

-- Create index for fast lookups
CREATE INDEX idx_page_content_lookup ON public.page_content(page_slug, locale, section_key);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_page_content_updated_at
  BEFORE UPDATE ON public.page_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default content for Open Water page
INSERT INTO public.page_content (page_slug, locale, section_key, content_type, content_value) VALUES
  ('open-water', 'en', 'hero_title', 'text', 'PADI Open Water Course'),
  ('open-water', 'en', 'hero_subtitle', 'text', 'The PADI Open Water Diver course is the world''s most popular scuba course. Learn the fundamentals of scuba diving and get certified to dive independently with a buddy, to 18 metres/60 feet.'),
  ('open-water', 'en', 'course_overview', 'text', 'The Open Water course combines knowledge development, confined water dives (pool) and open water dives. You''ll learn equipment setup, basic underwater skills, buoyancy control and dive planning. Our instructors keep groups small and emphasize safety and fun.'),
  ('open-water', 'nl', 'hero_title', 'text', 'PADI Open Water-cursus'),
  ('open-water', 'nl', 'hero_subtitle', 'text', 'De PADI Open Water Diver-cursus is de populairste duikcursus ter wereld. Je leert de basis van het duiken en behaalt je brevet om zelfstandig met een buddy te duiken tot 18 meter/60 voet.'),
  ('open-water', 'nl', 'course_overview', 'text', 'De Open Water-cursus combineert theorie, beschut water-training (zwembad) en buitenwaterduiken. Je leert uitrusting opbouwen, basisvaardigheden onder water, drijfvermogen en duikplanning. Onze instructeurs werken met kleine groepen en leggen de nadruk op veiligheid en plezier.')
ON CONFLICT (page_slug, locale, section_key) DO NOTHING;
