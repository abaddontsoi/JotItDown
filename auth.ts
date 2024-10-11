import NextAuth from "next-auth";
import Okta from "next-auth/providers/okta";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Okta, Google, GitHub],
})