function escapeRegex(characters: string) {
    // eslint-disable-next-line no-useless-escape
    return characters.replace(/[\[\](){}?*+^$\\.|-]/g, '\\$&');
}

export const trim = (str: string, characters?: string) => {
    characters = escapeRegex(characters ?? ' ');

    return str.replace(new RegExp(`^[${characters}]+|[${characters}]+$`, 'g'), '');
};
