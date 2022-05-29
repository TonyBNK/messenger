import {ChatItemType, FieldType} from '../../components/complex';
import {MessageItemType} from '../../components/base';
import doge from '../../../static/images/doge.jpg';
import parrot from '../../../static/images/parrot.jpg';

export const andrewMessages: Array<MessageItemType> = [
    {
        id: 0,
        author: {
            id: 1,
            name: 'Андрей',
        },
        data: {
            date: '19 июня 2021',
            time: '11:56',
            textContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque facilis iste labore laboriosam numquam! Ab, assumenda dolorum ea eaque exercitationem explicabo illo incidunt itaque nobis officiis placeat porro quaerat voluptas.',
        },
        attr: {
            class: 'pen-friend-message',
        },
    },
    {
        id: 1,
        author: {
            id: 1,
            name: 'Андрей',
        },
        data: {
            date: '19 июня 2021',
            time: '11:57',
            textContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet culpa dolorum enim error est ipsa laudantium molestiae mollitia nam odio, quod sint tempore velit! Et inventore nemo repellat sint soluta!',
        },
        attr: {
            class: 'pen-friend-message',
        },
    },
    {
        id: 2,
        author: {
            id: 0,
            name: 'Tony',
        },
        data: {
            date: '19 июня 2021',
            time: '12:00',
            textContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet culpa dolorum enim error est ipsa laudantium molestiae mollitia nam odio, quod sint tempore velit! Et inventore nemo repellat sint soluta!',
        },
        attr: {
            class: 'my-message',
        },
    },
];

export const tolyanMessages: Array<MessageItemType> = [
    {
        id: 0,
        author: {
            id: 2,
            name: 'Толян',
        },
        data: {
            date: '15 июня 2021',
            time: '13:00',
            textContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque facilis iste labore laboriosam numquam! Ab, assumenda dolorum ea eaque exercitationem explicabo illo incidunt itaque nobis officiis placeat porro quaerat voluptas.',
        },
        attr: {
            class: 'pen-friend-message',
        },
    },
    {
        id: 1,
        author: {
            id: 2,
            name: 'Толян',
        },
        data: {
            date: '15 июня 2021',
            time: '13:03',
            textContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet culpa dolorum enim error est ipsa laudantium molestiae mollitia nam odio, quod sint tempore velit! Et inventore nemo repellat sint soluta!',
        },
        attr: {
            class: 'pen-friend-message',
        },
    },
    {
        id: 2,
        author: {
            id: 0,
            name: 'Tony',
        },
        data: {
            date: '15 июня 2021',
            time: '14:00',
            textContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet culpa dolorum enim error est ipsa laudantium molestiae mollitia nam odio, quod sint tempore velit! Et inventore nemo repellat sint soluta!',
        },
        attr: {
            class: 'my-message',
        },
    },
    {
        id: 3,
        author: {
            id: 0,
            name: 'Tony',
        },
        data: {
            date: '15 июня 2021',
            time: '14:09',
            textContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet culpa dolorum enim error est ipsa laudantium molestiae mollitia nam odio, quod sint tempore velit! Et inventore nemo repellat sint soluta!',
        },
        attr: {
            class: 'my-message',
        },
    },
];

export const chatList: Array<ChatItemType> = [
    {
        id: 1,
        correspondent: {
            id: 1,
            name: 'Андрей',
            avatar: doge,
        },
        lastMessage: {
            text: 'Изображение',
            time: '10:50',
        },
        unreadMessagesCount: 2,
        messages: andrewMessages,
    },
    {
        id: 2,
        correspondent: {
            id: 2,
            name: 'Толян',
            avatar: parrot,
        },
        lastMessage: {
            text: 'Слышь',
            time: '10:49',
        },
        unreadMessagesCount: 1,
        messages: tolyanMessages,
    },
];

export const chatsFieldsFactory = (): Array<FieldType> => [
    {
        id: 'chats-message',
        type: 'text',
        name: 'message',
    },
];
