import { getUser } from "@/lib/getUser";
import CategoriesMainPage from "../../../../components/self-defined/CategoriesMainPage";
import Link from "next/link";
import { db } from "@/lib/db";

const CategoriesPage = async () => {
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

    const allCategories = db.category.findMany(
        {
            where: {
                belongToId: user.id,
            }
        }
    )

    return (
        <>
            <CategoriesMainPage />
        </>
    )
}

export default CategoriesPage;