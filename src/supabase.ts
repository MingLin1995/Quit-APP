import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.SUPABASE_URL as string;
const supabaseKey = import.meta.env.SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL 和 Anon Key 必須在 .env 檔案中設置");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
