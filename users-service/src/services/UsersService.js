import { logged, errorLogged } from '../utils/logged';

export default class UsersService {
    constructor(repository) {
        this.repository = repository;
    }

    @logged
    @errorLogged
    getUser(id) {
        return this.repository.getUser(id);
    }

    @logged
    @errorLogged
    getUsers(loginSubstring, limit) {
        return this.repository.getUsers(loginSubstring, limit);
    }

    @logged
    @errorLogged
    createUser(user) {
        return this.repository.createUser(user);
    }

    @logged
    @errorLogged
    updateUser(id, user) {
        return this.repository.updateUser(id, user);
    }

    @logged
    @errorLogged
    deleteUser(id) {
        return this.repository.deleteUser(id);
    }
}
