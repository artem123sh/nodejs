import UsersController from '../../../../api/controllers/UsersController';

describe('UsersController', () => {
    const error = new Error('test');
    const throwError = async () => {
        throw error;
    };
    const next = jest.fn();
    const userService = {
        getUser: throwError,
        getUsers: throwError,
        createUser: throwError,
        updateUser: throwError,
        deleteUser: throwError
    };
    const usersController = new UsersController(userService);
    const req = { params: {}, query: {}, body: {} };

    afterEach(() => {
        jest.clearAllMocks();
    });

    Object.keys(userService).forEach((methodName) => {
        it(`should invoke middleware if ${methodName} thrown an error`, async () => {
            await usersController[methodName](req, { json: () => {} }, next);
            expect(next).toBeCalledTimes(1);
            expect(next).toBeCalledWith(error);
        });
    });
});
