import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateJWT }  from '../utils/helpers.utils';
import User from '../models/user.model';

export const login = async (req: Request, res: Response) => {
    try {
        const { userName, password } = req.body;

        const user = await User.findOne({ where: { userName } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.status) {
            return res.status(404).json({ error: 'User is inactive or deleted' });
        }

        if (!password || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = await generateJWT(user);
        return res.status(200).json(token);
    } catch (error) {
        return res.status(500).json({ msg: 'Error [login]', error })
    }
}

export const changePassword = async (req: Request, res: Response) => {
    try {
        const { userName, currentPassword, newPassword } = req.body;

        const user = await User.findOne({ where: { userName } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!bcrypt.compareSync(currentPassword, user.password)) {
            return res.status(401).json({ error: 'Current password is incorrect' });
        }

        const hashedPassword = bcrypt.hashSync(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ msg: 'Password changed successfully' });
    } catch (error) {
        console.error('Error in changePassword:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};