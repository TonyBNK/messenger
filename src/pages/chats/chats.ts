import template from '../../templates/development/development.hbs';
import {ChatsDataType} from './types';

const data: ChatsDataType = {
    description: 'Страница в разработке',
    altUrl: '/',
    altUrlLabel: 'Назад',
};

const chats = document.getElementById('chats');

if (chats) {
    chats.innerHTML = template(data);
}
