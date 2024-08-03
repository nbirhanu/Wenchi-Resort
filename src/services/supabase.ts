import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://ibexhtzqarezyrkxzfsz.supabase.co'
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliZXhodHpxYXJlenlya3h6ZnN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE1NjUxNDksImV4cCI6MjAzNzE0MTE0OX0.TxttgLu-sTglzGuvcZvKJn_DjecEsefT68H0mEGfeZI'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
