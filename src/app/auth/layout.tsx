import { montserrat400 } from "@/fonts/custom/montserrat";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section
            className={`${montserrat400.className} min-h-screen antialiased flex items-center justify-center py-14 overflow-x-hidden`}
        >
            {children}
        </section>
    );
}
