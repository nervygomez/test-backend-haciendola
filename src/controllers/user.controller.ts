import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import User from '../models/user.model';

export const getUserById = async (req: Request, res: Response) => {

    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.json("User no found");
    return res.json({ user })
}

export const createUser = async (req: Request, res: Response) => {

    const { name, lastName, email, userName, password } = req.body;

    try {

        const userNameExists = await User.findOne({ where: { userName } });
        if (userNameExists) {
            return res.status(400).json({
                msg: 'username already exists'
            })
        }

        const emailExists = await User.findOne({ where: { email } });
        if (emailExists) {
            return res.status(400).json({
                msg: 'email already exists'
            })
        }

        const salt = bcrypt.genSaltSync(10);
        const cryptPass = bcrypt.hashSync(password, salt);
        const userBody = {
            name,
            lastName,
            email,
            userName,
            password: cryptPass
        }
        const user = await User.create(userBody);

        return res.json({
            msg: 'user created',
            user
        });
        
    } catch (error) {
        return res.status(500).json({
            msg: 'Error creating user',
            error
        });
    }
}