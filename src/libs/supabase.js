import { createClient } from "@supabase/supabase-js";
//import { SUPABASE_KEY, SUPABASE_URL } from "@/config";

export const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY)