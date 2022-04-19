import template from '../../templates/form/form.tmpl.hbs';

const data = {
    formTitle: 'Авторизация',
    fields: [
        {name: 'login', label: 'Логин', type: 'text', required: true},
        {name: 'password', label: 'Пароль', type: 'password', required: true}
    ],
    buttonLabel: 'Вход',
    altUrl: '../registration/registration.html',
    altUrlLabel: 'Ещё не зарегистрированы?',
};

document.getElementById('login').innerHTML = template(data);
