export default class GroupsRepository {
    constructor(model, dataMapper) {
        this.model = model;
        this.dataMapper = dataMapper;
    }

    getGroup = async (id) => {
        const group = await this.model.findByPk(id);
        return group;
    }

    getGroups = async () => {
        const groups = await this.model.findAll();
        return groups.map((group) => this.dataMapper.toDomain(group));
    }

    createGroup = async (group) => {
        try {
            return this.dataMapper.toDomain(await this.model.create(this.dataMapper.toDalEntity(group)));
        } catch (err) {
            if (err.name === 'SequelizeUniqueConstraintError') {
                const { errors: [{ message }] } = err;
                throw new Error(message);
            }
            throw err;
        }
    }

    updateGroup = async (id, group) => {
        try {
            const [count, [updatedGroup]] = await this.model.update(
                this.dataMapper.toDalEntity(group), { where: { id }, returning: true }
            );
            return count ? this.dataMapper.toDomain(updatedGroup) : null;
        } catch (err) {
            if (err.name === 'SequelizeUniqueConstraintError') {
                const { errors: [{ message }] } = err;
                throw new Error(message);
            }
            throw err;
        }
    }

    deleteGroup = async (id) => {
        const count = await this.model.destroy({ where: { id } });
        return Boolean(count);
    }

    addUsersToGroup = async (id, userIds) => {
        return await this.model.addUsersToGroup(id, userIds);
    }
}
