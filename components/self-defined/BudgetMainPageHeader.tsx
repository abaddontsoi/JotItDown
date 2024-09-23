import { Plus } from "lucide-react";
import { Button } from "../ui/button";

const BudgetMainPageHeader = () => {
    return (
        <>
            <div className="flex flex-row text-5xl items-end justify-between">
                Budget

                <Button className="" onClick={() => {
                    // setMode('Create');
                }}>
                    <Plus></Plus>
                    Create new
                </Button>
            </div>

        </>
    )
}

export default BudgetMainPageHeader;