import { Model, DataTypes } from "sequelize";
import db from "../config/db.config";

import { UserAttributes } from "./interface/user.interface";

interface UserModel extends Model<UserAttributes>, UserAttributes { }

const User = db.define<UserModel>('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    userName: {
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true
    }    
})

export default User;