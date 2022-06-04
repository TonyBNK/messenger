type Indexed<T = any> = {
    [key in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (const p in rhs) {
        // eslint-disable-next-line no-prototype-builtins
        if (!rhs.hasOwnProperty(p)) {
            continue;
        }

        try {
            if (rhs[p].constructor === Object) {
                rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
            } else {
                lhs[p] = rhs[p];
            }
        } catch (e) {
            lhs[p] = rhs[p];
        }
    }

    return lhs;
}

// function mergeObjects(target: { [key: string]: any }, source: { [key: string]: any }) {
//     Object
//         .keys(source)
//         .forEach((key) => {
//             const sourceValue = source[key];
//             const targetValue = target[key];
//             target[key] = mergeValues(targetValue, sourceValue);
//         });
//
//     return target;
// }
//
// function mergeArrays(target: any[], source: any[]) {
//     source.forEach((value, index) => {
//         target[index] = mergeValues(target[index], value);
//     });
//
//     return target;
// }
//
// function mergeValues(target: any, source: any) {
//     if (isPlainObject(target) && isPlainObject(source)) {
//         return mergeObjects(target, source);
//     }
//     if (Array.isArray(target) && Array.isArray(source)) {
//         return mergeArrays(target, source);
//     }
//     if (source === undefined) {
//         return target;
//     }
//     return source;
// }
//
// export function merge(lhs: Indexed, rhs: Indexed): Indexed {
//     return mergeValues(lhs, rhs);
// }
