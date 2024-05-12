import User from "../models/user.model";

export const userDuplicated = async (userName: string) => { 
    const foundUser = await User.findOne({ where: { userName } });
    if(foundUser) throw new Error('userName already exist')
}