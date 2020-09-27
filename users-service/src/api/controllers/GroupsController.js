export default class GroupsController {
    constructor(service) {
        this.service = service;
    }

    getGroup = async (req, res, next) => {
        try {
            const group = await this.service.getGroup(req.params.id);
            if (group) {
                res.json(group);
            } else {
                res.sendStatus(404);
            }
        } catch (e) {
            return next(e);
        }
    }

    getGroups = async (req, res, next) => {
        try {
            return res.json(await this.service.getGroups());
        } catch (e) {
            return next(e);
        }
    }

    createGroup = async (req, res, next) => {
        try {
            const groupDto = req.body;
            const group = await this.service.createGroup(groupDto);
            return res.status(201).json(group);
        } catch (e) {
            return next(e);
        }
    }

    updateGroup = async (req, res, next) => {
        try {
            const groupDto = req.body;
            const group = await this.service.updateGroup(req.params.id, groupDto);
            if (group) {
                res.json(group);
            } else {
                res.sendStatus(404);
            }
        } catch (e) {
            return next(e);
        }
    }

    deleteGroup = async (req, res, next) => {
        try {
            const result = await this.service.deleteGroup(req.params.id);
            if (result) {
                res.sendStatus(204);
            } else {
                res.sendStatus(404);
            }
        } catch (e) {
            return next(e);
        }
    }

    addUsersToGroup = async (req, res, next) => {
        try {
            const result = await this.service.addUsersToGroup(req.params.id, req.body.userIds);
            if (result) {
                res.sendStatus(204);
            } else {
                res.sendStatus(404);
            }
        } catch (e) {
            return next(e);
        }
    }
}
