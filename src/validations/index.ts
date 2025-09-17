import { z } from 'zod';

export const SignInSchema = z.object({
    email: z.email({
        message: 'Valid email is required.'
    }),
    password: z.string().nonoptional({ error: "Password is required." })
});


export const SignUpSchema = z.object({
    firstName: z.string()
        .min(1, {
            message: "Enter the first name."
        })
        .max(50, {
            message: "First name cannot be more than 50 characters long."
        }),
    lastName: z.string().optional(),
    email: z.email({
        message: 'Valid email is required.'
    }),
    password: z.string()
        .min(8, {
            message: 'Password must be more than 8 characters long.'
        })
        .max(16, {
            message: 'Password must not more than 16 characters long.'
        }),
    confirmPassword: z.string().min(1, { message: "Re-enter the password." })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], // this makes the error show up at confirmPassword
});

export type SignUpType = z.infer<typeof SignUpSchema>;
export type SignInType = z.infer<typeof SignInSchema>;