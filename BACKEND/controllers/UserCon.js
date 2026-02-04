// Receive user data from req.body
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

// REGISTER CONTROLLER
export const signup = async (req, res) => {

    // Validate inputs
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }


        // Create and save new user
        const newUser = await User.create({
            username,
            email,
            password,
        });

        // Call GenerateToken
        const token = generateToken(newUser._id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        // send response 
        return res.status(200).json({
            success: true,
            message: "Signup successfull",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error("Register error", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// LOGIN CONTROLLER
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate inputs
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }
        // find user by email
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials",
            });
        }

        // compare password
        const candidatePassword = await user.comparePassword(password);

        if (!candidatePassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials",
            });
        }
        // Generate JWT token
        const token = generateToken(user._id);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        // send response 
        return res.status(200).json({
            success: true,
            message: "Login successfull",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Register error", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }

}
// logout CONTROLLER
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });

    } catch (error) {
        console.error("Register error", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    };
}





