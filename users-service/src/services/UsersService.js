import { debugLog, errorLog } from '../utils/logged';

export default class UsersService {
    constructor(repository) {
        this.repository = repository;
    }

    @debugLog
    @errorLog
    getUser(id) {
        return this.repository.getUser(id);
    }

    @debugLog
    @errorLog
    getUsers(loginSubstring, limit) {
        return this.repository.getUsers(loginSubstring, limit);
    }

    @debugLog
    @errorLog
    createUser(user) {
        return this.repository.createUser(user);
    }

    @debugLog
    @errorLog
    updateUser(id, user) {
        return this.repository.updateUser(id, user);
    }

    @debugLog
    @errorLog
    deleteUser(id) {
        return this.repository.deleteUser(id);
    }
}
