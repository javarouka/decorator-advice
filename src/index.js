const BEFORE = Symbol('before');
const AFTER = Symbol('after');
const AROUND = Symbol('around');
const ERROR = Symbol('error');

const locationMap = {
    [BEFORE](prevFunction, advice) {
        return function before() {
            advice(this, arguments);
            return prevFunction.apply(this, arguments);
        }
    },
    [AFTER](prevFunction, advice) {
        return function after() {
            const ret = prevFunction.apply(this, arguments);
            return advice(this, ret, arguments);
        }
    },
    [AROUND](prevFunction, advice) {
        return function around() {
            return advice(() => prevFunction.apply(this, arguments));
        }
    },
    [ERROR](prevFunction, advice) {
        return function around() {
            try {
                return prevFunction.apply(this, arguments);
            }
            catch(err) {
                return advice(err);
            }
        }
    }
};

const isClassMethod = (target, descriptor) => descriptor && descriptor.value;

const crosscutMethod = (target, name, descriptor, advice, type) => {
    const prevFunction = descriptor.value;
    descriptor.value = locationMap[type](prevFunction, advice);
    return descriptor;
};

const crosscutFunction = (target, advice, type) => {
    return locationMap[type](target, advice);
};

function aspect({ type, advice }) {

    if(!(type in locationMap)) {
        return function crosscut(target, name, descriptor) {
            return descriptor || target;
        }
    }

    return function crosscut(target, name, descriptor) {

        if(isClassMethod(target, descriptor)) {
            return crosscutMethod(target, name, descriptor, advice, type)
        }

        return crosscutFunction(target, advice, type);
    }
}

export function before(advice) { return aspect({ type: BEFORE, advice }); }
export function after(advice) { return aspect({ type: AFTER, advice }); }
export function around(advice) { return aspect({ type: AROUND, advice }); }
export function error(advice) { return aspect({ type: ERROR, advice }); }

export default {
    before, after, around, error
}