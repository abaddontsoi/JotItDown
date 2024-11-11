import { getUser } from "@/lib/getUser"
import Link from "next/link";

export default async function Statistics() {
    const user = await getUser();

    if (!user) {
        return (
            <>
                Please <Link href={'/login'}>
                    Sign in
                </Link>
            </>
        )
    }

    return (
        <div>
            Statistics
        </div>
    )
}