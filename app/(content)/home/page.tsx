import { auth } from "@/auth";

const HomePage = async () => {
    const session = await auth();

    if (!session) {
        return (
            <>
                No Auth
            </>
        );
    }

    return (
        <div>
            Hi {session.user?.name}
        </div>
    )
}

export default HomePage;