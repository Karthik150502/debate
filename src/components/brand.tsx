import { cn } from "@/lib/utils";

interface Props {
    label?: string;
    size?: string
}

export function Brand({ label, size = '4xl' }: Props) {
    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <div className='flex items-center justify-center gap-2'>
                <p className={cn('font-bold tracking-tighter bg-gradient-to-br from-primary via-purple-500 to-primary bg-clip-text text-transparent p-2', `text-${size}`)}>Debate.io</p>
            </div>
            {
                label && <p className='text-muted-foreground text-xs font-bold'>{label}</p>
            }
        </div>
    );
}
