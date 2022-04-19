import template from '../../templates/error/error.tmpl.hbs';
import {last} from '../../utils/mydash';

const statusCode = last(window.location.search.split('='));

const data = {
    errorStatus: statusCode,
    errorDescription: statusCode === '404' ? 'Не туда попали' : 'Мы уже фиксим',
    altUrl: '../chats/chats.html',
    altUrlLabel: 'Назад к чатам',
};

document.getElementById('error').innerHTML = template(data);
