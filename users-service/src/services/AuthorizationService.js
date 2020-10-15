import { debugLog, errorLog } from '../utils/loggerDecorator';
import jwt from 'jsonwebtoken';

export default class AuthorizationService {
    constructor() {
        this.secret = process.env.SECRET;
    }

    @debugLog(true)
    @errorLog(true)
    async verifyAccessToken(token) {
        return jwt.verify(token, this.secret);
    }
}
