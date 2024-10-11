// 'use client';

import { signIn } from "@/auth";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { GithubIcon } from "lucide-react";
import Image from "next/image";

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
        <div className="flex flex-row items-center justify-center my-auto h-full">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome to Jot It Down</CardTitle>
                    <CardDescription>Please sign in with the followings</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-2 items-center">
                        {/* sign in with okta */}
                        <form action={oktaLogin} className="w-full">
                            <Button type="submit" className="w-full">
                                Sign In With Okta
                            </Button>
                        </form>

                        {/* sign in with google */}
                        <form action={googleLogin} className="w-full">
                            <Button type="submit" className="w-full flex flex-row items-center gap-3" variant={'outline'}>
                                <img className="basis-1/12 w-6 h-6" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo" />
                                <div className="basis-11/12">
                                    Sign In With Google
                                </div>
                            </Button>
                        </form>

                        {/* sign in with github */}
                        <form action={githubLogin} className="w-full">
                            <Button type="submit" className="w-full flex flex-row items-center gap-3">
                                <img className="basis-1/12 w-6 h-6" src="https://img.icons8.com/color/48/github--v1.png" alt="github--v1" />
                                <div className="basis-11/12">
                                    Sign In With GitHub
                                </div>
                            </Button>
                        </form>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default LoginCard;