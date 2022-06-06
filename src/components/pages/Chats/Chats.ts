import {Block} from '../../common';
import {
    AltUrl, Avatar, Button, Input, Message, MessageItemType,
} from '../../base';
import {
    regexRules, render, renderList, router,
} from '../../../utils/main';
import {
    Chat, ChatItemType, Form, Modal, Popup,
} from '../../complex';
import {Nullable} from '../../../types';
import {Arrow, More} from '../../icons';
import {
    addChatFieldFactory,
    addUserFieldFactory,
    chatsFieldsFactory,
    deleteUserFieldFactory,
} from '../../../mocks';
import {FieldsBuilder} from '../../../utils/handlers';
import {authController, chatsController} from '../../../utils/controllers';
import {chatsTemplate} from '../../../templates/pages';
import {isEqual} from '../../../utils/mydash';

type ChatsPropsType = {
    fieldsLabels?: {
        toProfileLabel?: string
    }
    sendButtonLabel?: string
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

        const {message} = regexRules.rules;

        const regex = props.regex ?? {
            message,
        };

        const addChatModalRegex = {
            add_chat_title: /^(?!\s*$).+/,
        };

        const addUserModalRegex = {
            add_user_login: /^(?=.*[a-zA-Z])[\w-]{3,20}$/,
        };

        const deleteUserModalRegex = {
            delete_user_login: /^(?=.*[a-zA-Z])[\w-]{3,20}$/,
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
                submit: (e: Event) => chatsController.sendMessage(
                    e,
                    regex,
                    this.props.socket,
                ),
            },
            attr: {
                name: 'chats-form',
            },
        });

        const addChatModal = new Modal({
            formTitle: 'Создать новый чат',
            fields: new FieldsBuilder(addChatFieldFactory())
                .withBlurHandler(addChatModalRegex)
                .withFocusHandler()
                .build(),
            buttonLabel: 'Создать',
            events: {
                submit: (e) => chatsController.createChat(e, addChatModalRegex),
            },
        });

        const addUserModal = new Modal({
            formTitle: 'Добавить пользователя',
            fields: new FieldsBuilder(addUserFieldFactory())
                .withBlurHandler(addUserModalRegex)
                .withFocusHandler()
                .build(),
            buttonLabel: 'Добавить',
            events: {
                submit: (e) => chatsController.addUserToChat(
                    e,
                    addUserModalRegex,
                    this.props.activeChat?.id,
                ),
            },
        });

        const deleteUserModal = new Modal({
            formTitle: 'Удалить пользователя',
            fields: new FieldsBuilder(deleteUserFieldFactory())
                .withBlurHandler(deleteUserModalRegex)
                .withFocusHandler()
                .build(),
            buttonLabel: 'Удалить',
            events: {
                submit: (e) => chatsController.deleteUserFromChat(
                    e,
                    deleteUserModalRegex,
                    this.props.activeChat?.id,
                ),
            },
        });

        const addChatButton = new Button({
            attr: {
                class: 'add-chat-button',
            },
            events: {
                click: (e: Event) => addChatModal.open.call(addChatModal, e),
            },
        });

        const toProfile = new AltUrl({
            label: fieldsLabels?.toProfileLabel ?? 'Профиль',
            children: new Arrow(),
            attr: {
                class: 'to-profile',
            },
            events: {
                click: () => router.go('/settings'),
            },
        });

        const chatListSearch = new Input({
            type: 'text',
            classNameInput: 'chat-list-search',
        });

        const chatOptions = new Popup({
            links: [
                {
                    label: 'Добавить пользователя',
                    events: {
                        click: (e) => addUserModal.open.call(addUserModal, e),
                    },
                },
                {
                    label: 'Удалить пользователя',
                    events: {
                        click: (e) => deleteUserModal.open.call(deleteUserModal, e),
                    },
                },
            ],
        });

        const moreButton = new Button({
            children: new More(),
            attr: {
                class: 'chat-options',
            },
            events: {
                click: (e: Event) => (chatOptions.isOpen
                    ? chatOptions.close.call(chatOptions, e)
                    : chatOptions.open.call(chatOptions, e)),
            },
        });

        const attachmentsButton = new Button({
            attr: {
                class: 'message-attachments',
            },
        });

        const avatar = new Avatar({
            attr: {
                class: 'chat-info-avatar',
                src: '',
                alt: 'ava',
            },
        });

        super('div', {
            ...props,
            addChatModal,
            addUserModal,
            deleteUserModal,
            addChatButton,
            toProfile,
            chatListSearch,
            avatar,
            moreButton,
            chatOptions,
            attachmentsButton,
            form,
            attr: {
                ...props.attr,
                class: props.attr?.class ?? 'chats-window',
            },
        });

        this.props.closeModal = addChatModal.close.bind(addChatModal);

        this.props.avatar = avatar;

        authController.getUserInfo();
        chatsController.getChats();
    }

    private renderMessages(chats: DocumentFragment) {
        if (this.props.messages?.length) {
            this.props.messages.forEach((message: MessageItemType) => {
                render('.messages-container', new Message({
                    ...message,
                }), chats);
            });
        }
    }

    componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>): boolean {
        if (!oldProps.user || !newProps.user) return oldProps.user !== newProps.user;
        if (!isEqual(oldProps.user, newProps.user)) return true;
        if (!isEqual(oldProps.chats, newProps.chats)) return true;
        if (oldProps.activeChat?.id !== newProps.activeChat?.id) return true;
        if (!isEqual(oldProps.messages, newProps.messages)) return true;
        return false;
    }

    render() {
        const {
            activeChat,
            messages,
            avatar,
        } = this.props;

        if (this._element) {
            this._element.addEventListener('click', (e) => this.props.closeModal(e));
        }

        if (activeChat?.avatarSrc && avatar) {
            avatar.setProps({
                attr: {
                    ...this.props.avatar.props.attr,
                    src: activeChat.avatarSrc,
                },
            });
        }

        const chatList = this.compile(chatsTemplate, {
            activeChat,
            messages,
        });

        renderList(chatList, '.chat-list-body', this.props.chats, Chat);

        this.renderMessages(chatList);

        return chatList;
    }
}
