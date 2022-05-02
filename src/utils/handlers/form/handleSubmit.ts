import {passwordValidate} from './passwordValidate';

export const handleSubmit = (e: Event, regex: Record<string, any>) => {
    e.preventDefault();

    const formData = e.target as HTMLFormElement;

    const prefix = formData.name.split('-')[0];

    const data = Object.fromEntries(new FormData(formData).entries());

    let error = false;

    Object
        .entries(data)
        .forEach(([key, value]) => {
            if (!regex[key].test(`${value}`) || !passwordValidate(`${prefix}-${key}`)) {
                const input = document.getElementById(key);
                if (input) {
                    input.classList.add('invalid');
                }
                const errorMessage = document.getElementById(`${key}-error-message`);
                if (errorMessage) {
                    errorMessage.textContent = `Некорректное поле ${key}`;
                }
                error = true;
            }
        });

    if (error) {
        return;
    }
    console.log(data);
    formData.reset();
};
