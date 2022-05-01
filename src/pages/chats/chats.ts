import {render} from '../../utils/renderDom';
import {
    AltUrl, Avatar, Button, Input,
} from '../../components/base';
import {Arrow, More} from '../../components/icons';
import {Chats} from '../../components/pages';
import {Form} from '../../components/complex';

const toProfile = new AltUrl({
    href: '../profile/profile.html',
    className: 'to-profile',
    label: 'Профиль',
    children: new Arrow({className: 'arrow'}),
});

const chatListSearch = new Input({
    type: 'text',
    classNameInput: 'chat-list-search',
});

const chatList = [
    {
        avatar: new Avatar({className: 'chat-content-avatar'}),
        name: 'Андрей',
        lastMessage: 'Изображение',
        lastMessageTime: '10:49',
        unreadMessages: 2,
        events: {
            click: () => {
                chats.setProps({
                    isChatSelected: true,
                });
            },
        },
    },
];

const penFriendAvatar = new Avatar({className: 'pen-friend-avatar'});

const moreButton = new Button({
    className: 'chat-options',
    children: new More({className: 'options-dot'}),
});

const messages = [
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

const attachmentsButton = new Button({
    className: 'message-attachments',
});

const handleSubmit = (e: Event) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement).entries());

    console.log(data);
};

const sendButton = new Button({
    type: 'submit',
    className: 'send-message',
    label: '➜',
});

const fields = [
    {
        type: 'text',
        classNameInput: 'new-message',
        name: 'message',
    },
];

const form = new Form({
    name: 'newMessage',
    fields,
    button: sendButton,
    events: {
        submit: handleSubmit,
    },
});

const chats = new Chats({
    toProfile,
    chatListSearch,
    chatList,
    penFriendAvatar,
    penFriendName: 'Андрей',
    moreButton,
    messagesDate: '19 июня',
    messages,
    attachmentsButton,
    form,
    isChatSelected: false,
});

render('#chats', chats);
