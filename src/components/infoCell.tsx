import React from 'react'
import { Input } from './ui/input'
import { Skeleton } from './ui/skeleton'

export default function InfoCell({
    value,
    label
}: {
    value?: string | null,
    label: string
}) {
    return (
        <div className='w-full flex items-center justify-between gap-2'>
            <span className='whitespace-nowrap text-sm'>{label}</span>
            {
                value ? <Input disabled value={value} /> : <Skeleton className="h-[35px] w-full rounded-md" />
            }
        </div>
    )
}
