import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<main className="flex flex-col items-center w-screen h-screen justify-center">
			<div
			className="text-9xl"
			>Welcome</div>
			<Link href={'/login'} className="">
				<Button className="hover:underline">
					Jot It Down
					<ArrowRight className="ml-2 w-4 h-4" />
				</Button>
			</Link>
		</main>
	);
}
