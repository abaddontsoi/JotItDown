import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import NavSideBar from "../../components/self-defined/NavSideBar";
import { Analytics } from "@vercel/analytics/react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SidebarComponent from "@/components/self-defined/Sidebar";

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
            {/* this is the navigation side bar */}
            <SidebarComponent />
            <main className="flex flex-row bg-gray-200 w-screen">
                {/* <div className="bg-gray-200 w-fit sticky h-screen">
                </div> */}
                <div className="bg-slate-100 w-full p-[20px]">
                    {/* <SidebarTrigger /> */}
                    {children}
                </div>
                <Analytics />
            </main>
        </SidebarProvider>
    );
}


export const dynamic = 'force-dynamic';