import User from './user';
import Group from './group';

Group.belongsToMany(User, { through: 'UserGroup' });
User.belongsToMany(Group, { through: 'UserGroup' });

export { User, Group };
