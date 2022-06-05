class RegexRules {
    private readonly _rules: Record<string, unknown>;

    constructor(rules: Record<string, unknown>) {
        this._rules = rules;
    }

    get rules() {
        return this._rules;
    }
}

export const regexRules = new RegexRules({
    message: /^(?!\s*$).+/,
    login: /^(?=.*[a-zA-Z])[\w-]{3,20}$/,
    password: /^(?=.*[A-Z])(?=.*\d)[\w@$!%*#?&-]{8,40}$/,
    first_name: /^[A-ZА-Я][A-zА-я-]+$/u,
    second_name: /^[A-ZА-Я][A-zА-я-]+$/u,
    display_name: /^[A-ZА-Я][A-zА-я-]+$/u,
    oldPassword: /^(?=.*[A-ZА-Я])(?=.*\d)[\wА-я@$!%*#?&-]{8,40}$/u,
    newPassword: /^(?=.*[A-ZА-Я])(?=.*\d)[\wА-я@$!%*#?&-]{8,40}$/u,
    newPassword_again: /^(?=.*[A-ZА-Я])(?=.*\d)[\wА-я@$!%*#?&-]{8,40}$/u,
    email: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/,
    phone: /^[+]?[0-9]{10,15}$/,
    password_again: /^(?=.*[A-ZА-Я])(?=.*\d)[\wА-я@$!%*#?&-]{8,40}$/u,
});
