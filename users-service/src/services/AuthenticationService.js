import { debugLog, errorLog } from '../utils/loggerDecorator';
import jwt from 'jsonwebtoken';
import util from 'util';

export default class AuthenticationService {
    constructor(userService, refreshTokenRepository) {
        this.userService = userService;
        this.refreshTokenRepository = refreshTokenRepository;
        this.secret = process.env.SECRET;
        this.accessTokenExpiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN;
        this.refreshTokenExpiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN;
    }

    @debugLog(true)
    @errorLog(true)
    async login(login, password) {
        const id = await this.userService.getUserIdByCredentials(login, password);
        if (!id) {
            return null;
        }
        const [accessToken, refreshToken] = await Promise.all([
            this.sign({ sub: id }, this.secret, this.accessTokenExpiresIn),
            this.refreshTokenRepository.createRefreshToken({ UserId: id })
        ]);
        return { accessToken, refreshToken: refreshToken.id };
    }

    @debugLog(true)
    @errorLog(true)
    async refreshAccessToken(userId, refreshTokenId) {
        const refreshToken = await this.refreshTokenRepository.getRefreshToken(refreshTokenId);
        if ((refreshToken && refreshToken.UserId === userId)
        && (refreshToken.createdAt && new Date(refreshToken.createdAt).valueOf() + +this.refreshTokenExpiresIn >= new Date().valueOf())) {
            return await this.sign({ sub: userId });
        }
        return null;
    }

    @debugLog(true)
    @errorLog(true)
    async sign(payload) {
        return util.promisify(jwt.sign, jwt)(payload, this.secret, { expiresIn: this.accessTokenExpiresIn });
    }

    @debugLog(true)
    @errorLog(true)
    async verifyJwt(token) {
        return util.promisify(jwt.verify, jwt)(token, this.secret);
    }
}
