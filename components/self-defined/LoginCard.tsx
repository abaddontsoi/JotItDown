// 'use client';

import { signIn } from "@/auth";
import { Button } from "../ui/button";

interface LoginCardProp {

}

const LoginCard = (
    {}: LoginCardProp
) => {
    return (
        <>
        <form action={async () => {
            "use server";
            await signIn("okta");
        }}>
            <Button type="submit">
                Sign In With Okta
            </Button>
        </form>
        </>
    );
}

export default LoginCard;