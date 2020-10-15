export default class RefreshTokenRepository {
    constructor(model) {
        this.model = model;
    }

    getRefreshToken = async (id) => {
        return await this.model.findByPk(id);
    };

    createRefreshToken = async (refreshToken) => {
        await this.model.destroy({ where: refreshToken });
        return await this.model.create(refreshToken);
    };
}
