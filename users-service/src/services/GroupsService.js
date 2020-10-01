import { logged, errorLogged } from '../utils/logged';

export default class GroupsService {
    constructor(repository) {
        this.repository = repository;
    }

    @logged
    @errorLogged
    async getGroup(id) {
        return await this.repository.getGroup(id);
    }

    @logged
    @errorLogged
    async getGroups() {
        return await this.repository.getGroups();
    }

    @logged
    @errorLogged
    async createGroup(group) {
        return await this.repository.createGroup(group);
    }

    @logged
    @errorLogged
    async updateGroup(id, group) {
        return await this.repository.updateGroup(id, group);
    }

    @logged
    @errorLogged
    async deleteGroup(id) {
        return await this.repository.deleteGroup(id);
    }

    @logged
    @errorLogged
    async addUsersToGroup(id, userIds) {
        return await this.repository.addUsersToGroup(id, userIds);
    }
}
