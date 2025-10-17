-- Migration script to add frontend-compatible fields to vendors table
-- This preserves existing data while adding new fields

-- Add new columns for frontend compatibility
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS specialty_new VARCHAR(255) DEFAULT 'General Services';
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS rating_new DOUBLE PRECISION DEFAULT 5.0;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS reviews_new INTEGER DEFAULT 0;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS location_new VARCHAR(255) DEFAULT '';
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS image_new TEXT;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS profile_image TEXT;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS services_new TEXT[] DEFAULT '{}';
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS price_range VARCHAR(255);
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS description_new TEXT;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS status_new VARCHAR(50) DEFAULT 'pending';
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS created_at_new TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS updated_at_new TIMESTAMPTZ DEFAULT NOW();

-- Migrate existing data to new fields
UPDATE vendors SET 
  specialty_new = COALESCE(specialties::TEXT, 'General Services'),
  rating_new = COALESCE(rating::DOUBLE PRECISION, 5.0),
  reviews_new = COALESCE(reviews_count, 0),
  location_new = COALESCE(address, ''),
  created_at_new = COALESCE(created_at, NOW()),
  updated_at_new = COALESCE(updated_at, NOW())
WHERE specialty_new IS NULL;

-- Add some sample data for the new fields
UPDATE vendors SET 
  services_new = ARRAY['Photography', 'Video', 'Drone'],
  price_range = '$200-500',
  description_new = 'Professional photography and video services',
  status_new = 'active'
WHERE services_new = '{}' AND id <= 3;
