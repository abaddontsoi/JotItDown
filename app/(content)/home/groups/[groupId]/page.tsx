import { getUser } from "@/lib/getUser";
import Link from "next/link";

interface GroupPageProp {

}

const GroupPage = async (
    { }: GroupPageProp
) => {

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
        <>
        </>
    )
}
export const dynamic = 'force-dynamic';

export default GroupPage;