import jwt from "jsonwebtoken"
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY || "7d";
export const generateToken = (userId) => {
    return jwt.sign({
        id: userId
    },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRY }
    );
};
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return null;
    }
};
export const decodeToken = (token) => {
    try {
        return jwt.decode(token);
    } catch (err) {
        return null;
    }
};
