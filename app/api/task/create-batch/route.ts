import { db } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const user = await getUser();
        if (!user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const {tasks} = await req.json();
        const batchCreate = await db.taskInfo.createMany({
            data: tasks,
        });

        return NextResponse.json({ message: "Task created successfully", data: batchCreate });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Task creation failed" }, { status: 500 });
    }
}