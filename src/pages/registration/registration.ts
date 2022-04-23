import template from '../../templates/form/form.hbs';

const data = {
    formTitle: 'Регистрация',
    fields: [
        {name: 'first_name', label: 'Имя', type: 'text', required: true},
        {name: 'second_name', label: 'Фамилия', type: 'text', required: true},
        {name: 'login', label: 'Логин', type: 'text', required: true},
        {name: 'email', label: 'Почта', type: 'email', required: true},
        {name: 'phone', label: 'Телефон', type: 'tel', required: true},
        {name: 'password', label: 'Пароль', type: 'password', required: true},
        {
            name: 'passwordAgain',
            label: 'Пароль ещё раз',
            type: 'password',
            required: true
        },
    ],
    buttonLabel: 'Зарегистрироваться',
    altUrl: '../login/login.html',
    altUrlLabel: 'Войти',
};

document.getElementById('registration').innerHTML = template(data);
