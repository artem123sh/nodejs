import logger from './logger';

export const debugLog = (target, key, descriptor) => {
    const value = descriptor.value;
    descriptor.value = function () {
        const args = JSON.stringify([...arguments]).replace(/^\[([\s\S]*)]$/, '$1');
        logger.error(`Invoking ${target.constructor.name}::${key}(${args})`);
        return value.apply(this, arguments);
    };
    return descriptor;
};

export const errorLog = (target, key, descriptor) => {
    const value = descriptor.value;
    descriptor.value = function () {
        try {
            return value.apply(this, arguments);
        } catch (err) {
            const args = JSON.stringify([...arguments]).replace(/^\[([\s\S]*)]$/, '$1');
            logger.error(`Error during invoking ${target.constructor.name}::${key}(${args}), error message: ${err.message}`);
            throw err;
        }
    };
    return descriptor;
};
