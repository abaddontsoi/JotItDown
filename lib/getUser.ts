import { auth } from "@/auth"
import { db } from "./db";

export const getSession = async () => {
    const session = await auth();
    return session;
}

export const getUser = async () => {
    const session = await getSession();

    const userInDB = await db.user.findFirst({
        where: {
            email: session?.user?.email || null
        }
    })

    return userInDB;
}