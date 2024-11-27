'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DetailedNote, Modes } from "./types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { TaskInfo } from "@prisma/client";
import Link from "next/link";
import { Settings } from "lucide-react";

interface NoteDisplayProp {
    note: DetailedNote;
    setMode: (mode: Modes) => void;
    setNote: (note: DetailedNote) => void;
}

const NoteDisplay = ({ note, setMode, setNote }: NoteDisplayProp) => {

    const router = useRouter();
    const totalNumberOfTasks: number = note.contentBlocks?.reduce((total, tasks) => {
        return total + tasks.taskInfo.length
    }, 0
    ) || 0;

    return (
        <Card className="max-w-[500px] hover:scale-[1.01] duration-200 border-2 hover:shadow-md hover:border-slate-500">
            <CardHeader className="flex flex-row gap-4 justify-between text-nowrap items-center">
                <CardTitle className="flex flex-row items-center">
                    <Button
                        className="text-2xl font-bold p-0"
                        onClick={() => {
                            router.push('/home/notes/' + note.id);
                        }}
                        variant={'link'}>
                        {note.title}
                    </Button>
                </CardTitle>
                <CardDescription className="truncate">Created at {note.createdAt.toDateString()}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {/* display maximum 4 categories here */}

                <CardDescription className="truncate">
                    {
                        note.description
                    }
                </CardDescription>

                <div className="flex flex-row items-center justify-between">
                    <Button
                        variant={'ghost'}
                        className="w-fit"
                        type='button'
                        onClick={() => {
                            setNote(note);
                            setMode('Edit');
                        }}
                    >
                        <Settings />
                    </Button>
                    {/* Count the total number of tasks, give a link to task page */}
                    {
                        totalNumberOfTasks == 0 ? (
                            <Link
                                className="text-right"
                                href={'/home/tasks'}>
                                No task
                            </Link>
                        ) : (
                            <Link
                                className="text-right"
                                href={'/home/tasks'}>
                                {totalNumberOfTasks} task(s)
                            </Link>
                        )
                    }
                </div>
            </CardContent>
        </Card>
    )
}

export default NoteDisplay;