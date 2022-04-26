import {Form} from '../../components/complex';
import {render} from '../../utils/renderDom';
import {AltUrl, Button} from '../../components/base';

const fields = [
    {
        name: 'first_name',
        label: 'Имя',
        type: 'text',
        required: true,
    },
    {
        name: 'second_name',
        label: 'Фамилия',
        type: 'text',
        required: true,
    },
    {
        name: 'login',
        label: 'Логин',
        type: 'text',
        required: true,
    },
    {
        name: 'email',
        label: 'Почта',
        type: 'email',
        required: true,
    },
    {
        name: 'phone',
        label: 'Телефон',
        type: 'tel',
        required: true,
    },
    {
        name: 'password',
        label: 'Пароль',
        type: 'password',
        required: true,
    },
    {
        name: 'passwordAgain',
        label: 'Пароль ещё раз',
        type: 'password',
        required: true,
    },
];

const button = new Button({
    type: 'submit',
    className: 'main-button',
    label: 'Зарегистрироваться',
});

const altUrl = new AltUrl({
    href: '../login/login.html',
    className: 'alt-url',
    label: 'Войти',
});

const registration = new Form({
    title: 'Регистрация',
    fields,
    button,
    altUrl,
});

render('#registration', registration);
