import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://doaksqufwtgwxakkdukw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvYWtzcXVmd3Rnd3hha2tkdWt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5NjU1MTksImV4cCI6MjA1OTU0MTUxOX0.PPICp_CTBsu2kcY58r2m1kYgkwGkzTEZGh_iRI97VNw';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
