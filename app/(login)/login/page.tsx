import LoginCard from "@/components/self-defined/LoginCard";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const LoginPage = async () => {
    return (
        <div className="h-screen bg-slate-200">
            {/* A login card */}
            <LoginCard />
        </div>
    )
}

export default LoginPage;