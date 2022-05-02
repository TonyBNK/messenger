import {FieldType, Form} from '../../components/complex';
import {AltUrl, Button} from '../../components/base';
import {render} from '../../utils/renderDom';
import {Login} from '../../components/pages';

const regex = {
    login: /^(?=.*[a-zA-Z])[\w-]{3,20}$/,
    password: /^(?=.*[A-Z])(?=.*\d)[\w@$!%*#?&-]{8,40}$/,
};

const handleSubmit = (e: Event) => {
    e.preventDefault();

    const formData = e.target as HTMLFormElement;

    const data = Object.fromEntries(new FormData(formData).entries());

    let error = false;

    Object
        .entries(data)
        .forEach(([key, value]) => {
            if (!regex[key as keyof typeof regex].test(`${value}`)) {
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

const handleBlur = (e: Event) => {
    const {
        value,
        classList,
        name,
    } = e.target as HTMLInputElement;

    if (!regex[name as keyof typeof regex].test(value)) {
        classList.add('invalid');
        const errorMessage = document.getElementById(`${name}-error-message`);
        if (errorMessage) {
            errorMessage.textContent = `Некорректное поле ${name}`;
        }
    }
};

const handleFocus = (e: Event) => {
    const {
        classList,
        name,
    } = e.target as HTMLInputElement;

    if (classList.contains('invalid')) {
        classList.remove('invalid');
        const errorMessage = document.getElementById(`${name}-error-message`);
        if (errorMessage) {
            errorMessage.textContent = '';
        }
    }
};

const fields: Array<FieldType> = [
    {
        name: 'login',
        label: 'Логин',
        type: 'text',
        events: {
            blur: handleBlur,
            focus: handleFocus,
        },
    },
    {
        name: 'password',
        label: 'Пароль',
        type: 'password',
        events: {
            blur: handleBlur,
            focus: handleFocus,
        },
    },
];

const button = new Button({
    type: 'submit',
    className: 'main-button',
    label: 'Вход',
});

const altUrl = new AltUrl({
    href: '../registration/registration.html',
    className: 'alt-url',
    label: 'Ещё не зарегистрированы?',
});

const form = new Form({
    name: 'loginPage',
    fields,
    button,
    altUrl,
    events: {
        submit: handleSubmit,
    },
});

const login = new Login({
    title: 'Авторизация',
    form,
});

render('#login-page', login);
