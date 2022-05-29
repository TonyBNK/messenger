import {Block} from '../../common';
import {
    AltUrl, Avatar, Button, Input, Message, MessageItemType,
} from '../../base';
import {render, renderList} from '../../../utils/main';
import {chatsTemplate} from '../../../templates/pages';
import {Chat, ChatItemType, Form} from '../../complex';
import {Nullable} from '../../../types';
import {Arrow, More} from '../../icons';
import {chatsFieldsFactory} from '../../../mocks';
import {FieldsBuilder, handleSubmit} from '../../../utils/handlers';

type ChatsPropsType = {
    fieldsLabels?: {
        toProfileLabel?: string
    }
    sendButtonLabel?: string
    chatList: Array<ChatItemType>
    activeChat?: Nullable<ChatItemType>
    regex?: {
        message: string
    }
    attr?: {
        id?: string
        class?: string
    }
}

export class Chats extends Block {
    constructor(props: ChatsPropsType) {
        const {
            fieldsLabels,
            sendButtonLabel,
        } = props;

        const regex = props.regex ?? {
            message: /^(?!\s*$).+/,
        };

        const sendButton = new Button({
            label: sendButtonLabel ?? '➜',
            attr: {
                type: 'submit',
                class: 'send-message',
            },
        });

        const form = new Form({
            fields: new FieldsBuilder(chatsFieldsFactory())
                .withBlurHandler(regex)
                .withFocusHandler()
                .build(),
            button: sendButton,
            events: {
                submit: (e: Event) => handleSubmit(e, regex),
            },
            attr: {
                name: 'chats-form',
            },
        });

        const avatar = new Avatar({
            attr: {
                class: 'pen-friend-avatar',
                src: props.activeChat?.correspondent.avatar,
                alt: 'ava',
            },
        });

        const toProfile = new AltUrl({
            label: fieldsLabels?.toProfileLabel ?? 'Профиль',
            children: new Arrow(),
            attr: {
                class: 'to-profile',
            },
            events: {
                click: () => window.router.go('/profile'),
            },
        });

        const chatListSearch = new Input({
            type: 'text',
            classNameInput: 'chat-list-search',
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

        super('div', {
            ...props,
            avatar,
            toProfile,
            chatListSearch,
            moreButton,
            attachmentsButton,
            form,
            attr: {
                ...props.attr,
                class: props.attr?.class ?? 'chats-window',
            },
        });

        this.props.ava = avatar;
    }

    private renderMessages(chats: DocumentFragment) {
        if (this.props.activeChat) {
            this.props.activeChat.messages.forEach((message: MessageItemType) => {
                render('.messages-container', new Message({
                    ...message,
                }), chats);
            });
        }
    }

    render() {
        const chats = this.compile(chatsTemplate, {
            activeChat: this.props.activeChat,
        });

        renderList(chats, '.chat-list-body', this.props.chatList, Chat);

        this.renderMessages(chats);

        return chats;
    }
}
