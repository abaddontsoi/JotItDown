'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { NotebookPen } from 'lucide-react';
import { navRoutes } from "./NavSideBarRoutes";

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
            {
                navRoutes.map(button => (
                    <Button
                    className="transition duration-200 hover:scale-[1.05] 
                    hover:translate-x-[5px]
                    "
                        onClick={() => {
                            router.push(button.route);
                        }}
                    >
                        {button.label}
                    </Button>
                ))
            }
        </div>
    )
}

export default NavSideBar;