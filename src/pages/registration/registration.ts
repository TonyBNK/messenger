import {Form} from '../../components/complex';
import {render} from '../../utils/renderDom';
import {AltUrl, Button} from '../../components/base';
import {Registration} from '../../components/pages';

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

const handleSubmit = (e: Event) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement).entries());

    console.log(data);
};

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

const form = new Form({
    fields,
    button,
    altUrl,
    name: 'registration',
    events: {
        submit: handleSubmit,
    },
});

const registration = new Registration({
    title: 'Регистрация',
    form,
});

render('#registration', registration);
