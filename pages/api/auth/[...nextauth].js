import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/User";
import { verifyPassword } from "../../../utils/auth";

const authOptions = {
    session: { strategy: "jwt" },
    providers: [
        CredentialsProvider({
            // This code is used for creating form in client side
            // name: "Credentials",
            // credentials: {
            //     email: { label: "Email", type: "email", placeholder: "Enter your email" },
            //     password: { label: "Password", type: "password", placeholder: "Enter your password" }
            // },

            async authorize(credentials, req) {
                const { email, password } = credentials;
                try {
                    await connectDB();
                } catch (error) {
                    throw new Error("Error in connecting to DB")
                }
                if(!email || !password) {
                    throw new Error("Email and password are required");
                }

                const user = await User.findOne({email});
                if(!email) {
                    throw new Error("User not found");
                }

                const isValid = await verifyPassword(password, user.password);
                if(!isValid) {
                    throw new Error("Username or password is incorrect");
                }
                return {email};
            }
        })
    ]
}

export default NextAuth(authOptions);