'use client';

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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
    const tasks: TaskInfo[] | undefined = contentBlock.taskInfo;

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

            <div className="flex flex-row justify-end">
                {
                    tasks &&
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={'link'}>
                                Tasks
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {
                                tasks.map(task => (
                                    <DropdownMenuItem key={task.id}>
                                        <Button variant={'link'}
                                            onClick={() => {
                                                router.push('/home/tasks/' + task.id);
                                            }}
                                        >
                                            {task.title}
                                        </Button>
                                    </DropdownMenuItem>
                                ))
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>
                }
            </div>
        </div>
    )
}

export default ContentBlockDisplay;