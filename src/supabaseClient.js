import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://etyvtnxuuupwncryjowt.supabase.co";       // from API settings
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0eXZ0bnh1dXVwd25jcnlqb3d0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4MzY4MjUsImV4cCI6MjA3NDQxMjgyNX0.g69q2LhCBFHYnQQUlWxG7wbzm4d5czc3SaTinSySYjA";  // from API settings

export const supabase = createClient(supabaseUrl, supabaseKey);
