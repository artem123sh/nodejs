import { debugLog, errorLog } from '../utils/loggerDecorator';

export default class GroupsService {
    constructor(repository) {
        this.repository = repository;
    }

    @debugLog()
    @errorLog()
    async getGroup(id) {
        return await this.repository.getGroup(id);
    }

    @debugLog()
    @errorLog()
    async getGroups() {
        return await this.repository.getGroups();
    }

    @debugLog()
    @errorLog()
    async createGroup(group) {
        return await this.repository.createGroup(group);
    }

    @debugLog()
    @errorLog()
    async updateGroup(id, group) {
        return await this.repository.updateGroup(id, group);
    }

    @debugLog()
    @errorLog()
    async deleteGroup(id) {
        return await this.repository.deleteGroup(id);
    }

    @debugLog()
    @errorLog()
    async addUsersToGroup(id, userIds) {
        return await this.repository.addUsersToGroup(id, userIds);
    }
}
