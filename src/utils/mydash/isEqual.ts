import {isArrayOrObject} from './isArrayOrObject';

type PlainObject<T = unknown> = {
    [k in string]: T;
};

export function isEqual(lhs: [] | PlainObject, rhs: [] | PlainObject) {
    if (Object.keys(lhs).length !== Object.keys(rhs).length) {
        return false;
    }

    for (const [key, value] of Object.entries(lhs)) {
        const rightValue = rhs[key as keyof typeof rhs];
        if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
            if (isEqual(value, rightValue)) {
                continue;
            }
            return false;
        }

        if (value !== rightValue) {
            return false;
        }
    }

    return true;
}
