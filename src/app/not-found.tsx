import Link from 'next/link'
import React from 'react'

export default function NotFoundPage() {
    return (
        <div className='w-full h-full flex flex-col items-start justify-start gap-2'>
            <p>Sorry the page you are looking for does not exist, click here to go back to <span className='font-bold underline'><Link href={"/"}>
                Home
            </Link></span></p>
        </div>
    )
}
