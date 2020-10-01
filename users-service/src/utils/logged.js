import logger from './logger';

export const logged = (target, key, descriptor) => {
    const value = descriptor.value;
    descriptor.value = function () {
        const args = JSON.stringify([...arguments]).replace(/^\[([\s\S]*)]$/, '$1');
        const dt = new Date();
        const timestamp = `${
            dt.getFullYear().toString().padStart(4, '0')
        }-${
            (dt.getMonth() + 1).toString().padStart(2, '0')
        }-${
            dt.getDate().toString().padStart(2, '0')
        } ${
            dt.getHours().toString().padStart(2, '0')
        }:${
            dt.getMinutes().toString().padStart(2, '0')
        }:${
            dt.getSeconds().toString().padStart(2, '0')
        }`;
        console.log(`${timestamp} \x1b[34mtrace\x1b[0m: Invoking ${target.constructor.name}::${key}(${args})`);
        return value.apply(this, arguments);
    };
    return descriptor;
};

export const errorLogged = (target, key, descriptor) => {
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
