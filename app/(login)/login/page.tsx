import LoginCard from "@/components/self-defined/LoginCard";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const LoginPage = async () => {
    return (
        <div>
            {/* some animated backgroud */}
            <AspectRatio 
            ratio={16/9}
            className="bg-slate-200">
                {/* A login card */}
                <LoginCard />
            </AspectRatio>
        </div>
    )
}

export default LoginPage;