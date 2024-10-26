import { signIn } from "next-auth/react";
import { useState } from "react";

const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async () => {
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false
        })
        console.log(res);
    }


    return <>
        <h1>Sign In</h1>
        <form>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
            <button onClick={handleSignIn}>Sign In</button>
        </form>
    </>
}

export default SignIn;