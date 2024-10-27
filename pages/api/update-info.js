import User from "../../models/User";
import connectDB from "../../utils/connectDB";
import { verifyPassword } from "../../utils/auth";
import { getSession } from "next-auth/react";

async function handler(req, res) {
    if (req.method !== "POST") {
        return;
    }
    try {
        await connectDB();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error in connection to DB" });
    }


    const { name, lastName, password } = req.body;
    const session = await getSession({ req });
    console.log(session);

    if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findOne({ email: session.user.email });
    console.log(session.user.email );
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
        return res.status(422).json({ message: "Invalid password" });
    }

    user.name = name;
    user.lastName = lastName;

    user.save();

    res.status(200).json({ message: "User updated successfully", data: { name, lastName, email: session.user.email } });

}

export default handler;
