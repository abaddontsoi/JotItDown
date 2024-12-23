import { getUser } from "@/lib/getUser";
import Link from "next/link";
import NoteCreateEditContainer from "./_component/NoteCreateEditContainer";

export default async function CreateNote() {
    const user = await getUser();

    if (!user) {
        return (
            <>
                Please <Link href={'/login'}>Sign in</Link>
            </>
        )
    }

    return (
        <div className="space-y-6 p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Create Note</h1>
            </div>
            <NoteCreateEditContainer />
        </div>
    );
}