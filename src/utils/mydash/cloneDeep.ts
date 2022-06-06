export function cloneDeep<T extends object = object>(obj: T) {
    return (function _cloneDeep(
        item: T,
    ): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] {
        if (item === null || typeof item !== 'object') {
            return item;
        }

        if (item instanceof Date) {
            return new Date(item.valueOf());
        }

        if (item instanceof Array) {
            const copy: Array<unknown> = [];

            item.forEach((_, i) => {
                (copy[i] = _cloneDeep(item[i]));
            });

            return copy;
        }

        if (item instanceof Set) {
            const copy = new Set();

            item.forEach((v) => copy.add(_cloneDeep(v)));

            return copy;
        }

        if (item instanceof Map) {
            const copy = new Map();

            item.forEach((v, k) => copy.set(k, _cloneDeep(v)));

            return copy;
        }

        const copy: object = {};
        Object
            .getOwnPropertySymbols(item)
            .forEach((s) => {
                // @ts-ignore
                (copy[s] = _cloneDeep(item[s]));
            });
        Object
            .keys(item)
            .forEach((k) => {
                // @ts-ignore
                (copy[k] = _cloneDeep(item[k]));
            });
        return copy;
    }(obj));
}
