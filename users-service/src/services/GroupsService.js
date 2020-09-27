export default class GroupsService {
    constructor(repository) {
        this.repository = repository;
    }

    getGroup = async (id) => {
        return await this.repository.getGroup(id);
    }

    getGroups = async () => {
        return await this.repository.getGroups();
    }

    createGroup = async (group) => {
        return await this.repository.createGroup(group);
    }

    updateGroup = async (id, group) => {
        return await this.repository.updateGroup(id, group);
    }

    deleteGroup = async (id) => {
        return await this.repository.deleteGroup(id);
    }

    addUsersToGroup = async (id, userIds) => {
        return await this.repository.addUsersToGroup(id, userIds);
    }
}
