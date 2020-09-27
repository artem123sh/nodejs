export default class UsersService {
    constructor(repository) {
        this.repository = repository;
    }

    getUser = async (id) => {
        return await this.repository.getUser(id);
    }

    getUsers = async (loginSubstring, limit) => {
        return await this.repository.getUsers(loginSubstring, limit);
    }

    createUser = async (user) => {
        return await this.repository.createUser(user);
    }

    updateUser = async (id, user) => {
        return await this.repository.updateUser(id, user);
    }

    deleteUser = async (id) => {
        return await this.repository.deleteUser(id);
    }
}
