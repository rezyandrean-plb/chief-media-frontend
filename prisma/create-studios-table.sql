-- Create studios table
CREATE TABLE IF NOT EXISTS "studios" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "hourlyRate" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "capacity" INTEGER,
    "photos" JSONB,
    "equipment" JSONB,
    "availability" JSONB,
    "amenities" JSONB,
    "size" TEXT,
    "status" TEXT DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "studios_pkey" PRIMARY KEY ("id")
);

-- Insert sample studios data
INSERT INTO "studios" ("id", "name", "location", "hourlyRate", "description", "capacity", "photos", "equipment", "availability", "amenities", "size", "status", "createdAt")
VALUES 
(
    'studio-1',
    'Studio A - Main Production',
    'Building 1, Floor 2',
    150,
    'Our flagship studio with professional lighting and green screen capabilities',
    15,
    '["/studio-a-main.jpg", "/studio-a-greenscreen.jpg", "/studio-a-equipment.jpg"]'::jsonb,
    '[{"id":"eq-1","name":"Sony A7S III","quantity":2,"category":"camera"},{"id":"eq-2","name":"Aputure 600D","quantity":4,"category":"lighting"},{"id":"eq-3","name":"Rode NTG5","quantity":2,"category":"audio"},{"id":"eq-4","name":"C-Stand","quantity":8,"category":"grip"}]'::jsonb,
    '[{"dayOfWeek":1,"startTime":"09:00","endTime":"18:00"},{"dayOfWeek":2,"startTime":"09:00","endTime":"18:00"},{"dayOfWeek":3,"startTime":"09:00","endTime":"18:00"},{"dayOfWeek":4,"startTime":"09:00","endTime":"18:00"},{"dayOfWeek":5,"startTime":"09:00","endTime":"18:00"}]'::jsonb,
    '["Green Screen", "Cyclorama Wall", "Client Lounge", "WiFi", "Parking"]'::jsonb,
    '1,200 sq ft',
    'active',
    '2024-01-15 10:00:00'::timestamp
),
(
    'studio-2',
    'Studio B - Photography',
    'Building 1, Floor 3',
    100,
    'Intimate photography studio with natural light options',
    8,
    '["/studio-b-main.jpg", "/studio-b-natural-light.jpg"]'::jsonb,
    '[{"id":"eq-5","name":"Canon R5","quantity":1,"category":"camera"},{"id":"eq-6","name":"Profoto B10","quantity":3,"category":"lighting"},{"id":"eq-7","name":"Backdrop Stand","quantity":2,"category":"grip"}]'::jsonb,
    '[{"dayOfWeek":1,"startTime":"08:00","endTime":"20:00"},{"dayOfWeek":2,"startTime":"08:00","endTime":"20:00"},{"dayOfWeek":3,"startTime":"08:00","endTime":"20:00"},{"dayOfWeek":4,"startTime":"08:00","endTime":"20:00"},{"dayOfWeek":5,"startTime":"08:00","endTime":"20:00"},{"dayOfWeek":6,"startTime":"10:00","endTime":"18:00"}]'::jsonb,
    '["Natural Light", "Backdrops", "WiFi", "Parking"]'::jsonb,
    '800 sq ft',
    'active',
    '2024-01-20 10:00:00'::timestamp
),
(
    'studio-3',
    'Studio C - Podcast Room',
    'Building 2, Floor 1',
    75,
    'Soundproof podcast recording studio with professional audio setup',
    6,
    '["/studio-c-podcast.jpg"]'::jsonb,
    '[{"id":"eq-8","name":"Shure SM7B","quantity":4,"category":"audio"},{"id":"eq-9","name":"Scarlett 18i20","quantity":1,"category":"audio"},{"id":"eq-10","name":"Sony A6400","quantity":2,"category":"camera"}]'::jsonb,
    '[{"dayOfWeek":1,"startTime":"09:00","endTime":"21:00"},{"dayOfWeek":2,"startTime":"09:00","endTime":"21:00"},{"dayOfWeek":3,"startTime":"09:00","endTime":"21:00"},{"dayOfWeek":4,"startTime":"09:00","endTime":"21:00"},{"dayOfWeek":5,"startTime":"09:00","endTime":"21:00"}]'::jsonb,
    '["Soundproof", "Audio Interface", "Headphones", "WiFi"]'::jsonb,
    '400 sq ft',
    'active',
    '2024-02-01 10:00:00'::timestamp
)
ON CONFLICT ("id") DO NOTHING;



