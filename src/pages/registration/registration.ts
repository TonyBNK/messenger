import {FieldType, Form} from '../../components/complex';
import {render} from '../../utils/main';
import {AltUrl, Button} from '../../components/base';
import {Registration} from '../../components/pages';
import {handleBlur, handleFocus, handleSubmit} from '../../utils/handlers';

const regex = {
    first_name: /^[A-ZА-Я][A-zА-я-]+$/u,
    second_name: /^[A-ZА-Я][A-zА-я-]+$/u,
    login: /^(?=.*[a-zA-Z])[\w-]{3,20}$/,
    password: /^(?=.*[A-ZА-Я])(?=.*\d)[\wА-я@$!%*#?&-]{8,40}$/u,
    password_again: /^(?=.*[A-ZА-Я])(?=.*\d)[\wА-я@$!%*#?&-]{8,40}$/u,
    email: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/,
    phone: /^[+]?[0-9]{10,15}$/,
};

const fields: Array<FieldType> = [
    {
        id: 'registration-first_name',
        name: 'first_name',
        label: 'Имя',
        type: 'text',
        events: {
            blur: (e: Event) => handleBlur(e, regex),
            focus: handleFocus,
        },
    },
    {
        id: 'registration-second_name',
        name: 'second_name',
        label: 'Фамилия',
        type: 'text',
        events: {
            blur: (e: Event) => handleBlur(e, regex),
            focus: handleFocus,
        },
    },
    {
        id: 'registration-login',
        name: 'login',
        label: 'Логин',
        type: 'text',
        events: {
            blur: (e: Event) => handleBlur(e, regex),
            focus: handleFocus,
        },
    },
    {
        id: 'registration-email',
        name: 'email',
        label: 'Почта',
        type: 'email',
        events: {
            blur: (e: Event) => handleBlur(e, regex),
            focus: handleFocus,
        },
    },
    {
        id: 'registration-phone',
        name: 'phone',
        label: 'Телефон',
        type: 'tel',
        events: {
            blur: (e: Event) => handleBlur(e, regex),
            focus: handleFocus,
        },
    },
    {
        id: 'registration-password',
        name: 'password',
        label: 'Пароль',
        type: 'password',
        events: {
            blur: (e: Event) => handleBlur(e, regex),
            focus: handleFocus,
        },
    },
    {
        id: 'registration-password_again',
        name: 'password_again',
        label: 'Пароль ещё раз',
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
    label: 'Зарегистрироваться',
});

const altUrl = new AltUrl({
    href: '../login/login.html',
    label: 'Войти',
});

const form = new Form({
    fields,
    button,
    altUrl,
    name: 'registration-form',
    events: {
        submit: (e: Event) => handleSubmit(e, regex),
    },
});

const registration = new Registration({
    title: 'Регистрация',
    form,
});

render('#registration', registration);
