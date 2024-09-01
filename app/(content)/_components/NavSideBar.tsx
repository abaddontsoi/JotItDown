'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { NotebookPen } from 'lucide-react';

const NavSideBar = () => {
    const router = useRouter();
    return (
        <div className="flex flex-col h-[100%] w-max gap-2 px-[25px]">
            <div>
                <Button 
                variant={'link'} 
                onClick={() => {
                    router.push('/home');  
                }}
                className="flex flex-row items-center m-[30px] text-2xl">
                    <NotebookPen className="w-10 h-10" />
                    JotItDown
                </Button>
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
                    router.push('/home/tasks');
                }}
            >
                Tasks
            </Button>
            <Button
                onClick={() => {
                    router.push('/home/categories');
                }}
            >
                Note Categories
            </Button>
            <Button
                onClick={() => {
                }}
            >
                Content Blocks
            </Button>
            <Button
                onClick={() => {
                }}
            >
                Budget
            </Button>
        </div>
    )
}

export default NavSideBar;