import GroupsController from '../../../../api/controllers/GroupsController';

describe('GroupsController', () => {
    const error = new Error('test');
    const throwError = async () => {
        throw error;
    };
    const next = jest.fn();
    const groupService = {
        getGroup: throwError,
        getGroups: throwError,
        createGroup: throwError,
        updateGroup: throwError,
        deleteGroup: throwError,
        addUsersToGroup: throwError
    };
    const groupsController = new GroupsController(groupService);
    const req = { params: {}, query: {}, body: {} };

    afterEach(() => {
        jest.clearAllMocks();
    });

    Object.keys(groupService).forEach((methodName) => {
        it(`should invoke middleware if ${methodName} thrown an error`, async () => {
            await groupsController[methodName](req, { json: () => {} }, next);
            expect(next).toBeCalledTimes(1);
            expect(next).toBeCalledWith(error);
        });
    });
});
