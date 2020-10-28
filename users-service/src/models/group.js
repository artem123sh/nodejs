import { DataTypes } from 'sequelize';
import { sequelize } from '../db/dbConnection';
import { GROUP_PERMISSIONS } from '../utils/constants';

const Group = sequelize.define('Group', {
    id: { allowNull: false, primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV1, unique: true },
    name: { type: DataTypes.STRING, unique: true },
    permissions: { type: DataTypes.ENUM(GROUP_PERMISSIONS) }
}, {
    timestamps: false
});

Group.addUsersToGroup = async (id, userIds) => {
    const group = await Group.findByPk(id);
    if (group) {
        await sequelize.transaction((transaction) => group.addUsers(userIds, { transaction }));
        return true;
    }
    return group;
};

export default Group;
