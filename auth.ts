import NextAuth from "next-auth";
import Okta from "next-auth/providers/okta";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Okta, Google, GitHub],
    adapter: PrismaAdapter(db),
})