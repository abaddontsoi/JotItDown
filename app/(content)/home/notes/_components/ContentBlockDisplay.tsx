'use client';

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ContentBlock, TaskInfo } from "@prisma/client";
import { useRouter } from "next/navigation";

const ContentBlockDisplay = (
    { contentBlock }: {
        contentBlock: ContentBlock & {
            taskInfo?: TaskInfo[]
        },
    }
) => {
    const router = useRouter();

    return (
        <div>
            {
                contentBlock.title &&
                (
                    <Label>
                        {contentBlock.title}
                    </Label>
                )
            }

            <div className="">
                {
                    contentBlock.content.split('\n').map(
                        s => (
                            <p>
                                {s}
                            </p>
                        )
                    )
                }
            </div>

            {/* Change to command or drop down menu */}
            <div className="flex flex-row justify-end">
                {
                    contentBlock.taskInfo?.map( task => (
                        <Button
                        onClick={() => {
                            router.push('/home/tasks/'+task.id);
                        }}
                        variant={'link'}
                        value={task.id}
                        >
                            {task.title}
                        </Button>
                    ))
                }
            </div>
        </div>
    )
}

export default ContentBlockDisplay;