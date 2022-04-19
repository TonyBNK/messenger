import template from '../../templates/development/development.tmpl.hbs';

const data = {
    description: 'Страница в разработке',
    altUrl: '/',
    altUrlLabel: 'Назад',
};

document.getElementById('chats').innerHTML = template(data);
