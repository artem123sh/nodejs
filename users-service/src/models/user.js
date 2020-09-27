import { DataTypes } from 'sequelize';
import { sequelize } from '../db/dbConnection';

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          login:
 *            type: string
 *          password:
 *            type: string
 *          age:
 *            type: number
 */

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
