import {isPlainObject} from './isPlainObject';
import {isArray} from './isArray';

type PlainObject<T = unknown> = {
    [k in string]: T;
};

export function isArrayOrObject(value: unknown): value is ([] | PlainObject) {
    return isPlainObject(value) || isArray(value);
}
