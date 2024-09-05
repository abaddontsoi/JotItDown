'use client';

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

const CategoriesMainPage = () => {
    const [dialogMode, setMode] = useState<'Create'|'Edit'|'Close'>();

    return (
        <>
            <div className="flex flex-row text-5xl items-end justify-between">
                Categories

                <Button className="" onClick={() => {
                    setMode('Create');
                }}>
                    <Plus></Plus>
                    Create new
                </Button>
            </div>
        </>
    )
}

export default CategoriesMainPage;