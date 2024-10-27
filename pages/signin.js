import { signIn, useSession } from "next-auth/react";
import { CONFIG_FILES } from "next/dist/shared/lib/constants";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SignIn = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async () => {
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false
        });

        if (!res.error) {
            router.replace("/");
        }
    }
    const {data , status} =useSession();

    useEffect(() => {
        if(status === "authenticated") {
            router.replace("/dashboard");
        }
    }, [status])


    return <>
        <h1>Sign In</h1>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
        <button onClick={handleSignIn}>Sign In</button>
        </>
}

export default SignIn;