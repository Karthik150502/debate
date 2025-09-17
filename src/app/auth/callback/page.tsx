"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AuthCallbackPage() {
    const router = useRouter();

    useEffect(() => {
        // Supabase automatically detects #access_token in the URL
        supabase.auth.onAuthStateChange(async (_event, session) => {
            if (session) {
                console.log("✅ Session restored:", session);
                router.push("/check"); // or wherever
            }
        });
    }, [router]);

    return <p>Setting up your session...</p>;
}
