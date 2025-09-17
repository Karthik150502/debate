"use client";
import React, { useEffect, useRef, useState, useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod';
import { CardWrapper } from '@/components/cardWrapper'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Loader2, LucideIcon } from 'lucide-react';
import { SignInSchema, SignInType } from '@/validations';
import { useForm } from 'react-hook-form';
import { FormSuccess } from '@/components/formSuccess';
import { Input } from '@/components/ui/input';
import { FormError } from '@/components/formError';
import { signIn } from '@/actions/sign-in';
import { useRouter } from 'next/navigation';
import { getSession } from '@/actions/getSession';
export default function SignInForm() {

    const router = useRouter();
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [showPwd, setShowPwd] = useState<boolean>(false)
    const [isPending, startTransition] = useTransition();
    const pwdRef = useRef<LucideIcon>(EyeOff);

    useEffect(() => {
        checkUserSession()
    }, [])

    const checkUserSession = () => {
        getSession().then(({ session }) => {
            if (session) {
                router.push("/");
            }
        })
    }

    const form = useForm<SignInType>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = (values: SignInType) => {
        setError('');
        setSuccess('');

        startTransition(() => {
            signIn(values).then((data) => {
                if (data.user) {
                    setSuccess("Successfully signed in.");
                    checkUserSession();
                }
                if (data.error) {
                    setError(data.error);
                }
            })
        });
    };


    return (
        <CardWrapper
            headerLabel='Sign In'
            footerLabel='Sign Up'
            footerHref='/auth/sign-up'
            footerDesc='Not registered yet?'
            showSocial
        >
            <FormSuccess message={success} />
            {!success && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                        <div className='space-y-4'>
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder='steverogers115@domain.com'
                                                type='email'
                                                autoComplete='email'
                                            />
                                        </FormControl>
                                        <div className='w-full flex items-center justify-end'>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className='w-full bg-red h-full relative'>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder='••••••••'
                                                    type={showPwd ? "text" : "password"}
                                                />
                                                <Button type="button" variant={"outline"} size={"icon"}
                                                    onClick={() => {
                                                        setShowPwd(!showPwd)
                                                        pwdRef.current = showPwd ? EyeOff : Eye
                                                    }}
                                                    className='absolute right-0 top-0 rounded-tl-none rounded-bl-none group'
                                                >
                                                    <pwdRef.current className='stroke-muted-foreground transition-colors duration-300 group-hover:stroke-primary_2' />
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <div className='w-full flex items-center justify-end'>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormError message={error} />
                        <Button disabled={isPending} type='submit' className='w-full'>
                            {isPending && (
                                <>
                                    <Loader2 className='animate-spin mr-2' size={18} />
                                    Signing In...
                                </>
                            )}
                            {!isPending && <>Sign In</>}
                        </Button>
                    </form>
                </Form>
            )}
        </CardWrapper>
    )
}
