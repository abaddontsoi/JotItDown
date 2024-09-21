import { LoaderCircle } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const ContextCardFallBack = () => {
    return (
        <>
            <Card className="">
                <CardContent
                className="w-full flex flex-row justify-center h-[300px]"
                >
                    <div className="flex flex-row my-auto">
                        <LoaderCircle
                            className="animate-spin"
                        />
                        Loading ...
                    </div>
                </CardContent>
            </Card>

        </>
    )
}

export default ContextCardFallBack;