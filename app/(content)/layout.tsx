import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import NavSideBar from "../../components/self-defined/NavSideBar";

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
        <main className="flex flex-row bg-gray-200">
            {/* this is the navigation side bar */}
                <NavSideBar />
            {/* <div className="bg-gray-200 w-fit sticky h-screen">
            </div> */}
            <div className="bg-slate-100 w-screen p-[20px]">
                {children}
            </div>
        </main>
    );
}
