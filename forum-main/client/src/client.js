import { createClient } from '@supabase/supabase-js'

const URL = 'https://udotfggfxnahlhxbyskr.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkb3RmZ2dmeG5haGxoeGJ5c2tyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1NTQ2NTAsImV4cCI6MjAyODEzMDY1MH0.jHsAK4kNyp2REQy4MAk1uYlSLIWS9vaS7By0X285rlM'

export const supabase = createClient(URL, API_KEY)