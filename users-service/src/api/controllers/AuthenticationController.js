export default class AuthenticationController {
    constructor(service) {
        this.service = service;
    }

    login = async (req, res, next) => {
        try {
            const { login, password } = req.body;
            const authorization = await this.service.login(login, password);
            if (authorization && authorization.accessToken) {
                res.header('Authorization', `Bearer ${authorization.accessToken}`);
                return res.status(200).json({ refreshToken: authorization.refreshToken });
            }
            res.sendStatus(401);
        } catch (e) {
            return next(e);
        }
    }

    refreshToken = async (req, res, next) => {
        try {
            const { refreshToken } = req.body;
            const newAccessToken = await this.service.refreshAccessToken(refreshToken);
            if (newAccessToken) {
                res.header('Authorization', `Bearer ${newAccessToken}`);
                return res.sendStatus(204);
            }
            res.sendStatus(401);
        } catch (e) {
            return next(e);
        }
    }
}
