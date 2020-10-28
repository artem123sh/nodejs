import UsersController from '../../../../api/controllers/UsersController';

describe('UsersController', () => {
    const next = jest.fn();
    const responseBody = { example: 'test' };
    const mock = jest.fn(() => Promise.resolve(responseBody));
    const response = { json: jest.fn(), status: jest.fn(() => response), sendStatus: jest.fn() };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return a user by id', async () => {
        const userService = { getUser: mock };
        const usersController = new UsersController(userService);
        const input = { id: 1 };
        await usersController.getUser({ params: input }, response, next);
        expect(mock).toBeCalledTimes(1);
        expect(mock).toBeCalledWith(input.id);
        expect(response.json).toBeCalledWith(responseBody);
        expect(next).toBeCalledTimes(0);
    });

    it('should return users', async () => {
        const userService = { getUsers: mock };
        const usersController = new UsersController(userService);
        await usersController.getUsers({ query: {} }, response, next);
        expect(mock).toBeCalledTimes(1);
        expect(mock).toBeCalledWith(undefined, undefined);
        expect(response.json).toBeCalledWith(responseBody);
        expect(next).toBeCalledTimes(0);
    });

    it('should create user', async () => {
        const userService = { createUser: mock };
        const usersController = new UsersController(userService);
        const payload = { payload: 'test' };
        await usersController.createUser({ body: payload }, response, next);
        expect(mock).toBeCalledTimes(1);
        expect(mock).toBeCalledWith(payload);
        expect(response.status).toBeCalledWith(201);
        expect(response.json).toBeCalledWith(responseBody);
        expect(next).toBeCalledTimes(0);
    });

    it('should udapte user', async () => {
        const userService = { updateUser: mock };
        const usersController = new UsersController(userService);
        const req = { params: { id: 1 }, body: { payload: 'test' } };
        await usersController.updateUser(req, response, next);
        expect(mock).toBeCalledTimes(1);
        expect(mock).toBeCalledWith(req.params.id, req.body);
        expect(response.json).toBeCalledWith(responseBody);
        expect(next).toBeCalledTimes(0);
    });

    it('should delete user', async () => {
        const userService = { deleteUser: mock };
        const usersController = new UsersController(userService);
        const req = { params: { id: 1 } };
        await usersController.deleteUser(req, response, next);
        expect(mock).toBeCalledTimes(1);
        expect(mock).toBeCalledWith(req.params.id);
        expect(response.sendStatus).toBeCalledWith(204);
        expect(next).toBeCalledTimes(0);
    });
});
