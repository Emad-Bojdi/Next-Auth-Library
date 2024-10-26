import { useState } from "react";

const SignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async () => {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json();
        console.log(data);
    }

    return (<>
        <h1>Sign Up</h1>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
        <button onClick={handleSignUp}>Sign Up</button>
    </>)
}

export default SignUp;