import { Sequelize } from 'sequelize';

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set!');
}

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
    retry: {
        match: [
            /SequelizeConnectionError/,
            /SequelizeConnectionRefusedError/,
            /SequelizeHostNotFoundError/,
            /SequelizeHostNotReachableError/,
            /SequelizeInvalidConnectionError/,
            /SequelizeConnectionTimedOutError/
        ],
        timeout: 5000,
        max: 10
    },
    logging: false
});

export const sync = async () => {
    await sequelize.sync();
    // user for testing only as all endpoints require an authorized user, will be removed once task 6 is reviewed by an expert
    await sequelize.models.User.findOrCreate({ where: {
        login: 'user',
        password: 'pass1',
        isDeleted: false,
        age: 4
    } });
};
