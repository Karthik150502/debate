"use client";

import { getSession } from '@/actions/getSession';
import { signOut } from '@/actions/sign-out';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Page() {

    const router = useRouter();
    const [userData, setUserData] = useState<any>("");

    const checkUserSession = () => {
        getSession().then(({ session }) => {
            console.log({ session })
            if (!session) {
                router.push("/auth/sign-in");
            } else {
                setUserData(session.user)
            }
        })
    }

    useEffect(() => {
        checkUserSession()
    }, [])


    return (
        <div className='flex items-center justify-center flex-col gap-5'>
            <code>{JSON.stringify(userData, null, 4)}</code>
            <Button onClick={() => {
                signOut()
            }}>
                Sign Out
            </Button>
        </div>
    )
}
