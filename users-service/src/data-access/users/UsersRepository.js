import { Op } from 'sequelize';

export default class UsersRepository {
    constructor(model, dataMapper) {
        this.model = model;
        this.dataMapper = dataMapper;
    }

    getUserIdByCredentials = async (login, password) => {
        const user = await this.model.findOne({ where: { login, password, isDeleted: false } });
        return user ? this.dataMapper.toDomain(user).id : null;
    };

    getUser = async (id) => {
        const user = await this.model.findByPk(id);
        return user && !user.isDeleted ? this.dataMapper.toDomain(user) : null;
    }

    getUsers = async (loginSubstring, limit) => {
        const query = { where: { isDeleted: false } };
        if (loginSubstring) {
            query.where.login = { [Op.like]: `%${loginSubstring}%` };
        }
        if (limit) {
            query.limit = limit;
        }
        const users = await this.model.findAll(query);
        return users.map((user) => this.dataMapper.toDomain(user));
    }

    createUser = async (user) => {
        try {
            return this.dataMapper.toDomain(await this.model.create(this.dataMapper.toDalEntity(user)));
        } catch (err) {
            if (err.name === 'SequelizeUniqueConstraintError') {
                const { errors: [{ message }] } = err;
                throw new Error(message);
            }
            throw err;
        }
    }

    updateUser = async (id, user) => {
        try {
            const [count, [updatedUser]] = await this.model.update(
                this.dataMapper.toDalEntity(user), { where: { id, isDeleted: false }, returning: true }
            );
            return count ? this.dataMapper.toDomain(updatedUser) : null;
        } catch (err) {
            if (err.name === 'SequelizeUniqueConstraintError') {
                const { errors: [{ message }] } = err;
                throw new Error(message);
            }
            throw err;
        }
    }

    deleteUser = async (id) => {
        const [count] = await this.model.update({ isDeleted: true }, { where: { id } });
        return Boolean(count);
    }
}
