import { DataTypes } from 'sequelize';
import { sequelize } from '../db/dbConnection';

const User = sequelize.define('User', {
    id: { allowNull: false, primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV1, unique: true },
    login: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    age: { type: DataTypes.INTEGER },
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
    timestamps: false
});

export default User;
