import { DataTypes } from 'sequelize';
import { sequelize } from '../db/dbConnection';
import { GROUP_PERMISSIONS } from '../utils/contants';

/**
 * @swagger
 *  components:
 *    schemas:
 *      Group:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          permissions:
 *            type: string
 */

const Group = sequelize.define('Group', {
    id: { allowNull: false, primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV1, unique: true },
    name: { type: DataTypes.STRING, unique: true },
    permissions: { type: DataTypes.ENUM(GROUP_PERMISSIONS) }
}, {
    timestamps: false
});

/**
 * @swagger
 *  components:
 *    schemas:
 *      GroupUsers:
 *        type: object
 *        properties:
 *          userIds:
 *            type: array
 *            items:
 *              type: string
 */

Group.addUsersToGroup = async (id, userIds) => {
    const group = await Group.findByPk(id);
    if (group) {
        await sequelize.transaction((transaction) => group.addUsers(userIds, { transaction }));
        return true;
    }
    return group;
};

export default Group;
