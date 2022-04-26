import {ChatsDataType} from './types';
import {developmentTemplate} from '../../templates/complex';

const data: ChatsDataType = {
    description: 'Страница в разработке',
    altUrl: '/',
    altUrlLabel: 'Назад',
};

const chats = document.getElementById('chats');

if (chats) {
    chats.innerHTML = developmentTemplate(data);
}
