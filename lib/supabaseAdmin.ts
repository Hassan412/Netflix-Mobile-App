import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASEURL || "";
const serviceRoleKey = process.env.EXPO_PUBLIC_SERVICE_ROLE_KEY || "";

const adminAuthClient = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Access auth admin api
export default adminAuthClient;
