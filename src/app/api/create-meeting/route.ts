import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
export async function GET(request: NextRequest) {

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ status: 404, message: "Unauthorized." })
    }
    return NextResponse.json({ message: `Hello ${user?.user_metadata.firstName}!!!` })
}