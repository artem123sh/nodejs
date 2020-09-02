export default class UsersController {
    constructor(service) {
        this.service = service;
    }

    getUser = async (req, res, next) => {
        try {
            const user = await this.service.getUser(req.params.id);
            if (user) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        } catch (e) {
            return next(e);
        }
    }

    getUsers = async (req, res, next) => {
        try {
            const { limit, loginSubstring } = req.query;
            return res.json(await this.service.getUsers(loginSubstring, limit));
        } catch (e) {
            return next(e);
        }
    }


    createUser = async (req, res, next) => {
        try {
            const userDto = req.body;
            const user = await this.service.createUser(userDto);
            return res.json(user);
        } catch (e) {
            return next(e);
        }
    }

    updateUser = async (req, res, next) => {
        try {
            const userDto = req.body;
            const user = await this.service.updateUser(req.params.id, userDto);
            if (user) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        } catch (e) {
            return next(e);
        }
    }


    deleteUser = async (req, res, next) => {
        try {
            const result = await this.service.deleteUser(req.params.id);
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
