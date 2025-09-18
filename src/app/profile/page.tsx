"use client";

import { getSession } from '@/actions/getSession';
import { UserProfile } from '@/utils/supabase/types';
import React, { useEffect, useState } from 'react';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import InfoCell from '@/components/infoCell';

export default function Page() {

    const [user, setUser] = useState<UserProfile | null>(null);

    useEffect(() => {
        getSession().then(({ session }) => {
            console.log({
                session
            })
            if (session) {
                setUser(() => {
                    return {
                        id: session.user.id,
                        email: session.user.email,
                        firstName: session.user.user_metadata.firstName,
                        lastName: session.user.user_metadata.lastName,
                        emailVerified: session.user.user_metadata.email_verified,
                    }
                })
            }
        })
    }, [])

    return (
        <div className='w-full h-full flex items-center justify-start flex-col gap-5'>
            <Card className='w-full'>
                <CardHeader>
                    {/* <CardDescription>Card Description</CardDescription> */}
                    {/* <CardAction>Card Action</CardAction> */}
                </CardHeader>
                <CardContent>
                    <div className='w-full grid not-lg:grid-cols-1 lg:grid-cols-2 gap-6'>
                        <InfoCell
                            label={"Full Name"}
                            value={user ? `${user.firstName} ${user.lastName}` : null}
                        />
                        <InfoCell
                            label={"Email"}
                            value={user?.email}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    {/* <p>Card Footer</p> */}
                </CardFooter>
            </Card>
        </div>
    )
}
