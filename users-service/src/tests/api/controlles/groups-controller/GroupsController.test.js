import GroupsController from '../../../../api/controllers/GroupsController';

describe('GroupsController', () => {
    const next = jest.fn();
    const responseBody = { example: 'test' };
    const mock = jest.fn(() => Promise.resolve(responseBody));
    const response = { json: jest.fn(), status: jest.fn(() => response), sendStatus: jest.fn() };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return a group by id', async () => {
        const groupsService = { getGroup: mock };
        const groupsController = new GroupsController(groupsService);
        const input = { id: 1 };
        await groupsController.getGroup({ params: input }, response, next);
        expect(mock).toBeCalledTimes(1);
        expect(mock).toBeCalledWith(input.id);
        expect(response.json).toBeCalledWith(responseBody);
        expect(next).toBeCalledTimes(0);
    });

    it('should return groups', async () => {
        const groupsService = { getGroups: mock };
        const groupsController = new GroupsController(groupsService);
        await groupsController.getGroups({ query: {} }, response, next);
        expect(mock).toBeCalledTimes(1);
        expect(mock).toBeCalledWith();
        expect(response.json).toBeCalledWith(responseBody);
        expect(next).toBeCalledTimes(0);
    });

    it('should create group', async () => {
        const groupsService = { createGroup: mock };
        const groupsController = new GroupsController(groupsService);
        const payload = { payload: 'test' };
        await groupsController.createGroup({ body: payload }, response, next);
        expect(mock).toBeCalledTimes(1);
        expect(mock).toBeCalledWith(payload);
        expect(response.status).toBeCalledWith(201);
        expect(response.json).toBeCalledWith(responseBody);
        expect(next).toBeCalledTimes(0);
    });

    it('should udapte group', async () => {
        const groupsService = { updateGroup: mock };
        const groupsController = new GroupsController(groupsService);
        const req = { params: { id: 1 }, body: { payload: 'test' } };
        await groupsController.updateGroup(req, response, next);
        expect(mock).toBeCalledTimes(1);
        expect(mock).toBeCalledWith(req.params.id, req.body);
        expect(response.json).toBeCalledWith(responseBody);
        expect(next).toBeCalledTimes(0);
    });

    it('should delete group', async () => {
        const groupsService = { deleteGroup: mock };
        const groupsController = new GroupsController(groupsService);
        const req = { params: { id: 1 } };
        await groupsController.deleteGroup(req, response, next);
        expect(mock).toBeCalledTimes(1);
        expect(mock).toBeCalledWith(req.params.id);
        expect(response.sendStatus).toBeCalledWith(204);
        expect(next).toBeCalledTimes(0);
    });

    it('should add users to a group', async () => {
        const groupsService = { addUsersToGroup: mock };
        const groupsController = new GroupsController(groupsService);
        const req = { params: { id: 1 }, body: { userIds: 'test' } };
        await groupsController.addUsersToGroup(req, response, next);
        expect(mock).toBeCalledTimes(1);
        expect(mock).toBeCalledWith(req.params.id, req.body.userIds);
        expect(response.sendStatus).toBeCalledWith(204);
        expect(next).toBeCalledTimes(0);
    });
});
