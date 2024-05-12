import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("x-token");

        if (!token) {
            return res.status(401).json({ status: 401, msg: "No token in the request" });
        }

        const { user } = jwt.verify(token, process.env.SEED!) as { user: any }; 
        
        if (!user.status) {
            return res.status(401).json({ msg: "Invalid token - user status: false" });
        }

        return next();
    } catch (error) {
        res.status(403).json({ msg: "Server Error - Token" });
    }

}