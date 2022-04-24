import template from '../../templates/form/form.hbs';
import {LoginDataType} from "./types";

const data: LoginDataType = {
    formTitle: 'Авторизация',
    fields: [
        {name: 'login', label: 'Логин', type: 'text', required: true},
        {name: 'password', label: 'Пароль', type: 'password', required: true}
    ],
    buttonLabel: 'Вход',
    altUrl: '../registration/registration.html',
    altUrlLabel: 'Ещё не зарегистрированы?',
};

const login = document.getElementById('login');

if (login) {
    login.innerHTML = template(data);
}
