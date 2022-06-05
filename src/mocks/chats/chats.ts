import {FieldType} from '../../components/complex';

export const chatsFieldsFactory = (): Array<FieldType> => [
    {
        id: 'chats-message',
        type: 'text',
        name: 'message',
    },
];
