import {FieldType} from '../../components/complex';

// export const chatList: Array<ChatItemType> = [
//     {
//         id: 1,
//         correspondent: {
//             id: 1,
//             name: 'Андрей',
//             avatar: doge,
//         },
//         lastMessage: {
//             text: 'Изображение',
//             time: '10:50',
//         },
//         unreadMessagesCount: 2,
//         messages: andrewMessages,
//     },
//     {
//         id: 2,
//         correspondent: {
//             id: 2,
//             name: 'Толян',
//             avatar: parrot,
//         },
//         lastMessage: {
//             text: 'Слышь',
//             time: '10:49',
//         },
//         unreadMessagesCount: 1,
//         messages: tolyanMessages,
//     },
// ];

export const chatsFieldsFactory = (): Array<FieldType> => [
    {
        id: 'chats-message',
        type: 'text',
        name: 'message',
    },
];
