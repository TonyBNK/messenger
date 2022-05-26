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
import doge from '../../../static/images/doge.jpg';

const regex = {
    message: /^(?!\s*$).+/,
};

const toProfile = new AltUrl({
    label: 'Профиль',
    children: new Arrow({attr: {class: 'arrow'}}),
    attr: {
        href: '../profile/profile.html',
        class: 'to-profile',
    },
});

const chatListSearch = new Input({
    type: 'text',
    classNameInput: 'chat-list-search',
});

const chatList = [
    {
        avatar: new Avatar({
            attr: {
                class: 'chat-content-avatar',
                src: doge,
                alt: 'ava',
            },
        }),
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
        attr: {
            class: 'chat-list-item',
        },
    },
];

const penFriendAvatar = new Avatar({
    attr: {
        class: 'pen-friend-avatar',
        src: doge,
        alt: 'ava',
    },
});

const moreButton = new Button({
    children: new More(),
    attr: {
        class: 'chat-options',
    },
});

const attachmentsButton = new Button({
    attr: {
        class: 'message-attachments',
    },
});

const sendButton = new Button({
    label: '➜',
    attr: {
        type: 'submit',
        class: 'send-message',
    },
});

const form = new Form({
    fields: withFocusHandler(withBlurHandler(chatsFields, regex)),
    button: sendButton,
    events: {
        submit: (e: Event) => handleSubmit(e, regex),
    },
    attr: {
        name: 'chats-form',
        class: 'form-info',
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
    attr: {
        class: 'window',
    },
});

render('#chats', chats);
