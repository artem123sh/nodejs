import GroupsController from '../../../../api/controllers/GroupsController';

describe('GroupsController', () => {
    const notFound = jest.fn(() => Promise.resolve(null));
    const groupService = {
        getGroup: notFound,
        updateGroup: notFound,
        deleteGroup: notFound,
        addUsersToGroup: notFound
    };
    const groupsController = new GroupsController(groupService);
    const req = { params: {}, query: {}, body: {} };
    const response = { json: jest.fn(), sendStatus: jest.fn() };

    afterEach(() => {
        jest.clearAllMocks();
    });

    Object.keys(groupService).forEach((methodName) => {
        it(`should return not found status during ${methodName}`, async () => {
            await groupsController[methodName](req, response, null);
            expect(groupService[methodName]).toBeCalledTimes(1);
            expect(response.json).toBeCalledTimes(0);
            expect(response.sendStatus).toBeCalledTimes(1);
            expect(response.sendStatus).toBeCalledWith(404);
        });
    });
});
