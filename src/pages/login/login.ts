import {Form} from '../../components/complex';
import {AltUrl, Button} from '../../components/base';
import {render} from '../../utils/renderDom';
import {Login} from '../../components/pages';

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

const handleSubmit = (e: Event) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement).entries());

    console.log(data);
};

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
    name: 'login',
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

render('#login', login);
