import { DataTypes } from 'sequelize';
import { sequelize } from '../db/dbConnection';

/**
 * @swagger
 *  components:
 *    schemas:
 *      Group:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *          userId:
 *            type: string
 */

const RefreshToken = sequelize.define('RefreshToken', {
    id: { allowNull: false, primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, unique: true }
}, {
    timestamps: true,
    updatedAt: false
});

export default RefreshToken;
