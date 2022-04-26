import {Form} from '../../components/complex';
import {AltUrl, Button} from '../../components/base';
import {render} from '../../utils/renderDom';

const fields = [
    {
        name: 'login',
        label: 'Логин',
        type: 'text',
        required: true,
    },
    {
        name: 'password',
        label: 'Пароль',
        type: 'password',
        required: true,
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

const login = new Form({
    title: 'Авторизация',
    fields,
    button,
    altUrl,
});

render('#login', login);
