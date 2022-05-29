import {Block, IBlock} from '../../common';
import {chatTemplate} from '../../../templates/complex';
import {Avatar, MessageItemType} from '../../base';

export type ChatItemType = {
    id: number
    correspondent: {
        id: number
        avatar: string
        name: string
    }
    lastMessage: {
        text: string
        time: string
    },
    unreadMessagesCount?: number
    messages: Array<MessageItemType>
    selected?: boolean
    attr?: {
        id?: string
        class?: string
    }
}

export interface IChat extends IBlock {
}

export class Chat extends Block {
    constructor(props: ChatItemType) {
        const avatar = new Avatar({
            attr: {
                class: 'chat-content-avatar',
                src: props.correspondent.avatar,
                alt: 'ava',
            },
        });

        super('div', {
            ...props,
            attr: {
                ...props.attr,
                class: props.attr?.class ?? 'chat-list-item-container',
            },
            avatar,
        });
    }

    _addEvents() {
        if (this._element) {
            const chatItem = this._element.querySelector('.chat-list-item');

            if (chatItem) {
                chatItem.addEventListener('click', this.chatClick.bind(this));
            }
        }
    }

    chatClick() {
        const chats = window.router.getRoute('/chats')._block;

        chats.setProps({
            activeChat: this.props,
        });
        chats.props.ava.setProps({attr: {src: this.props.correspondent.avatar}});
        this.setProps({selected: true});
    }

    render() {
        return this.compile(chatTemplate, {
            id: this.props.id,
            correspondent: this.props.correspondent,
            lastMessage: this.props.lastMessage,
            unreadMessagesCount: this.props.unreadMessagesCount,
            selected: this.props.selected,
        });
    }
}
