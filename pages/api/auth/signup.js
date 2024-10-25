import User from "../../../models/User";
import connectDB from "../../../utils/connectDB";
import { hashPassword } from "../../../utils/auth";

async function signup(req, res) {
    if (req.method !== "POST") {
        return;
    }
    try {
        await connectDB();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error in connection to DB" });
    }

    const {email , password} = req.body;

    if(!email || !password) {
        return res.status(422).json({status: "failed",  message: "Email and password are required" });
    }

    const existingUser = await User.findOne({email});   
    if(existingUser) {
        return res.status(422).json({status: "failed", message: "User already exists"});
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({email, password: hashedPassword});
    console.log(newUser);

    res.status(201).json({status: "success", message: "User created successfully"});
}

export default signup;