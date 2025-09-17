import { SignUpType } from "@/validations";
import { createClient } from "@/utils/supabase/client";
import { AuthError } from "@supabase/supabase-js";

export async function signUp(values: SignUpType) {
    try {
        const supabase = createClient()
        const result = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
            options: {
                data: {
                    firstName: values.firstName,
                    lastName: values.lastName
                }
            }
        })
        return { user: result.data.user, error: null }
    } catch (error) {
        if (error instanceof AuthError) {
            return { user: null, error: error.message }
        }
        return { user: null, error: "Couldn't sign up due to some technical errors, please try again later." }
    }
}