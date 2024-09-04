import { Category } from "@prisma/client";

export type DetailedCategory = Category & {
    parentCategory?: DetailedCategory
    // category: DetailedCategory[] | null
}