function isEmpty(value) {
    if (!value) {
        return true;
    }

    if (typeof value === 'object') {
        if (value.size !== 0) return false;
        if (Object.keys(value).length === 0) return true;
    }

    const primitiveTypes = ['number', 'boolean', 'bigint', 'symbol'];

    for (let i = 0; i < primitiveTypes.length; i++) {
        if (typeof value === primitiveTypes[i]) {
            return true;
        }
    }

    return false;
}

export default isEmpty;
