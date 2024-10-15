import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster";
import { getUser } from "@/lib/getUser";
import Link from "next/link";

const HomePage = async () => {
    // const session = await auth();
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
            Hi {user.name}
            <Toaster />
        </div>
    )
}
export const dynamic = 'force-dynamic';

export default HomePage;