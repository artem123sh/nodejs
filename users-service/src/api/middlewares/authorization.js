const verifyAccessToken = (authenticationService) => async (req, res, next) => {
    const authorization = req.get('Authorization');
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.sendStatus(401);
    }
    const token = authorization.slice(7, authorization.length);
    try {
        const { sub } = await authenticationService.verifyAccessToken(token);
        req.userId = sub;
    } catch (e) {
        return res.sendStatus(403);
    }
    next();
};

export default verifyAccessToken;
