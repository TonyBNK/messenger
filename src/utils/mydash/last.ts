function last<T>(list: Array<T>): T | undefined {
    if (!Array.isArray(list)) {
        return;
    }
    const length = list.length;
    return length ? list[length - 1] : undefined;
}

export default last;
