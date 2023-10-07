import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://vyctwaenrtiymemfihuk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5Y3R3YWVucnRpeW1lbWZpaHVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYxNzk3MjksImV4cCI6MjAxMTc1NTcyOX0.rPFMobfWA-GrlbV_BnWMNBrd995TUxMkNk6nuMdPwzI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
