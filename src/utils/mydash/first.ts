function first(list) {
    if (!Array.isArray(list)) {
        return;
    }
    return list.length ? list[0] : undefined;
}

export default first;
