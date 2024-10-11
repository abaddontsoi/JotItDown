// 'use client';

import { signIn } from "@/auth";
import { Button } from "../ui/button";

interface LoginCardProp {

}


const LoginCard = (
    { }: LoginCardProp
) => {
    const oktaLogin = async () => {
        "use server";
        await signIn("okta", {
            redirectTo: "/home"
        });
    }

    const googleLogin = async () => {
        "use server";
        await signIn("google", {
            redirectTo: "/home"
        });
    }
    const githubLogin = async () => {
        "use server";
        await signIn("github", {
            redirectTo: "/home"
        });
    }
    return (
        <>
            {/* sign in with okta */}
            <form action={oktaLogin}>
                <Button type="submit">
                    Sign In With Okta
                </Button>
            </form>


            {/* sign in with google */}
            <form action={googleLogin}>
                <Button type="submit">
                    Sign In With Google
                </Button>
            </form>

            {/* sign in with github */}
            <form action={githubLogin}>
                <Button type="submit">
                    Sign In With GitHub
                </Button>
            </form>

        </>
    );
}

export default LoginCard;