import {FieldType, Form} from '../../components/complex';
import {AltUrl, Button} from '../../components/base';
import {render} from '../../utils/main';
import {Login} from '../../components/pages';
import {handleBlur, handleFocus, handleSubmit} from '../../utils/handlers';

const regex = {
    login: /^(?=.*[a-zA-Z])[\w-]{3,20}$/,
    password: /^(?=.*[A-Z])(?=.*\d)[\w@$!%*#?&-]{8,40}$/,
};

const fields: Array<FieldType> = [
    {
        id: 'login-login',
        name: 'login',
        label: 'Логин',
        type: 'text',
        events: {
            blur: (e: Event) => handleBlur(e, regex),
            focus: handleFocus,
        },
    },
    {
        id: 'login-password',
        name: 'password',
        label: 'Пароль',
        type: 'password',
        events: {
            blur: (e: Event) => handleBlur(e, regex),
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
    label: 'Ещё не зарегистрированы?',
});

const form = new Form({
    name: 'login-form',
    fields,
    button,
    altUrl,
    events: {
        submit: (e: Event) => handleSubmit(e, regex),
    },
});

const login = new Login({
    title: 'Авторизация',
    form,
});

render('#login-page', login);
