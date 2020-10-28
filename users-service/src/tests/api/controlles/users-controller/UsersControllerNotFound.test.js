import UsersController from '../../../../api/controllers/UsersController';

describe('UsersController', () => {
    const notFound = jest.fn(() => Promise.resolve(null));
    const userService = {
        getUser: notFound,
        updateUser: notFound,
        deleteUser: notFound
    };
    const usersController = new UsersController(userService);
    const req = { params: {}, query: {}, body: {} };
    const response = { json: jest.fn(), sendStatus: jest.fn() };

    afterEach(() => {
        jest.clearAllMocks();
    });

    Object.keys(userService).forEach((methodName) => {
        it(`should return not found status during ${methodName}`, async () => {
            await usersController[methodName](req, response, null);
            expect(userService[methodName]).toBeCalledTimes(1);
            expect(response.json).toBeCalledTimes(0);
            expect(response.sendStatus).toBeCalledTimes(1);
            expect(response.sendStatus).toBeCalledWith(404);
        });
    });
});
