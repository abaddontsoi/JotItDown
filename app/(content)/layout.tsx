import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import NavSideBar from "../../components/self-defined/NavSideBar";
import { Analytics } from "@vercel/analytics/react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SidebarComponent from "@/components/self-defined/SidebarComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "JotItDown",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <main className="flex flex-row bg-gray-200 w-full">
                <SidebarComponent />
                <div className="bg-slate-100 w-full">
                    {/* <SidebarTrigger /> */}
                    {children}
                    <Analytics />
                </div>
            </main>
        </SidebarProvider>
    );
}


export const dynamic = 'force-dynamic';