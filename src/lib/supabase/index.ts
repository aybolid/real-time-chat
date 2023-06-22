import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl) {
  throw new Error('Supabase URL is not defined');
}
if (!supabaseKey) {
  throw new Error('Supabase key is not defined');
}

const sb = createClient(supabaseUrl, supabaseKey);

export default sb;
