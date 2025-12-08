import jwt from "jsonwebtoken"
import { config } from "dotenv";

config()

export const auth = (req, res, next) => {
    let token;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    } 
    else if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({ success: false , message: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.password = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ success: false , message: 'Invalid token' });
    }
};