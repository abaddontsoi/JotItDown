import { auth } from "@/auth";
import { getUser } from "@/lib/getUser";

const HomePage = async () => {
    // const session = await auth();
    const user = await getUser();

    if (!user) {
        return (
            <>
                No Auth
            </>
        );
    }

    return (
        <div>
            Hi {user.name}
        </div>
    )
}
export const dynamic = 'force-dynamic';

export default HomePage;