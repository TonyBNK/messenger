import {passwordValidate} from './passwordValidate';

export const handleBlur = (e: Event, regex: Record<string, any>) => {
    const {
        value,
        classList,
        name,
        id,
    } = e.target as HTMLInputElement;

    if (!regex[name].test(value) || !passwordValidate(id)) {
        classList.add('invalid');
        const errorMessage = document.getElementById(`${name}-error-message`);
        if (errorMessage) {
            errorMessage.textContent = `Некорректное поле ${name}`;
        }
    }
};
