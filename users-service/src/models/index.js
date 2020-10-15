import User from './user';
import Group from './group';
import RefreshToken from './refreshToken';

Group.belongsToMany(User, { through: 'UserGroup' });
User.hasOne(RefreshToken);
RefreshToken.belongsTo(User);
User.belongsToMany(Group, { through: 'UserGroup' });

export { User, Group, RefreshToken };
