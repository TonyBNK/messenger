import {FieldType} from '../../components/complex';

export const messages = [
    {
        className: 'pen-friend-message',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque facilis iste labore laboriosam numquam! Ab, assumenda dolorum ea eaque exercitationem explicabo illo incidunt itaque nobis officiis placeat porro quaerat voluptas.',
        time: '11:56',
    },
    {
        className: 'pen-friend-message',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet culpa dolorum enim error est ipsa laudantium molestiae mollitia nam odio, quod sint tempore velit! Et inventore nemo repellat sint soluta!',
        time: '11:57',
    },
    {
        className: 'my-message',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet culpa dolorum enim error est ipsa laudantium molestiae mollitia nam odio, quod sint tempore velit! Et inventore nemo repellat sint soluta!',
        time: '12:00',
    },
];

export const chatsFields: Array<FieldType> = [
    {
        id: 'chats-message',
        type: 'text',
        name: 'message',
    },
];
