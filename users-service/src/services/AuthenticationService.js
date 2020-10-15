import { debugLog, errorLog } from '../utils/loggerDecorator';
import jwt from 'jsonwebtoken';

export default class AuthenticationService {
    constructor(userService, refreshTokenReposiory) {
        this.userService = userService;
        this.refreshTokenReposiory = refreshTokenReposiory;
        this.secret = process.env.SECRET;
        this.accessTokenExpiresIn = process.env.ACCESS_TOCKEN_EXPIRES_IN;
        this.refreshTokenExpiresIn = process.env.REFRESH_TOCKEN_EXPIRES_IN;
    }

    @debugLog(true)
    @errorLog(true)
    async login(login, password) {
        const id = await this.userService.getUserIdByCredentials(login, password);
        if (!id) {
            return null;
        }
        const accessToken = await this.getToken({ sub: id });
        const refreshTokenId = await this.refreshTokenReposiory.createRefreshToken({ UserId: id });
        const refreshToken = await this.getRefreshToken({ sub: refreshTokenId.id, resourceId: id }, refreshTokenId.id);
        return { accessToken, refreshToken };
    }

    @debugLog(true)
    @errorLog(true)
    async refreshAccessToken(token) {
        const decodedToken = jwt.decode(token);
        try {
            const { sub: refreshTokenId, resourceId: userId } = await this.verifyRefreshToken(token, decodedToken.sub);
            const refreshToken = await this.refreshTokenReposiory.getRefreshToken(refreshTokenId);
            if (refreshToken && refreshToken.UserId === userId) {
                return await this.getToken({ sub: userId });
            }
            return null;
        } catch (e) {
            return null;
        }
    }

    @debugLog(true)
    @errorLog(true)
    async getToken(payload) {
        return jwt.sign(payload, this.secret, { expiresIn: this.accessTokenExpiresIn });
    }

    @debugLog(true)
    @errorLog(true)
    async getRefreshToken(payload, requestTokenId) {
        return jwt.sign(payload, this.secret + requestTokenId, { expiresIn: this.refreshTokenExpiresIn });
    }

    @debugLog(true)
    @errorLog(true)
    async verifyAccessToken(token) {
        return jwt.verify(token, this.secret);
    }

    @debugLog(true)
    @errorLog(true)
    async verifyRefreshToken(token, refreshTokenId) {
        return jwt.verify(token, this.secret + refreshTokenId);
    }
}
