import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import NavSideBar from "./_components/NavSideBar";

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
        <main className="flex flex-row">
            {/* this is the navigation side bar */}
            <div className="h-screen bg-gray-200 w-fit">
                <NavSideBar />
            </div>
            <div className="h-screen bg-slate-100 w-screen">
                {children}
            </div>
        </main>
    );
}
