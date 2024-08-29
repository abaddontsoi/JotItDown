'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { NotebookPen } from 'lucide-react';

const NavSideBar = () => {
    const router = useRouter();
    return (
        <div className="flex flex-col h-[100%] w-max gap-2 px-[25px]">
            <div className="flex flex-row items-center m-[30px]">
                <NotebookPen />
                JotItDown
            </div>
            <Button
                onClick={() => {
                    router.push('/home/notes');
                }}
            >
                Notes
            </Button>
            <Button
                onClick={() => {
                    router.push('/home/categories');
                }}
            >
                Categories
            </Button>
        </div>
    )
}

export default NavSideBar;