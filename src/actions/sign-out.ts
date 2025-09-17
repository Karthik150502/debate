import { createClient } from "@/utils/supabase/client";

export async function signOut() {
    const supabase = createClient()
    return supabase.auth.signOut({ scope: "local" });
}