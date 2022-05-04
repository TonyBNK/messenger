import {render} from '../../utils/main';
import {
    AltUrl, Avatar, Button, Input,
} from '../../components/base';
import {Arrow, More} from '../../components/icons';
import {Chats} from '../../components/pages';
import {Form} from '../../components/complex';
import {handleSubmit} from '../../utils/handlers';
import {withFocusHandler} from '../../utils/handlers/form/handleFocus';
import {withBlurHandler} from '../../utils/handlers/form/handleBlur';
import {chatsFields, messages} from '../../mocks';

const regex = {
    message: /^(?!\s*$).+/,
};

const toProfile = new AltUrl({
    href: '../profile/profile.html',
    className: 'to-profile',
    label: 'Профиль',
    children: new Arrow(),
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
    children: new More(),
});

const attachmentsButton = new Button({
    className: 'message-attachments',
});

const sendButton = new Button({
    type: 'submit',
    className: 'send-message',
    label: '➜',
});

const form = new Form({
    name: 'chats-form',
    fields: withFocusHandler(withBlurHandler(chatsFields, regex)),
    button: sendButton,
    events: {
        submit: (e: Event) => handleSubmit(e, regex),
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
