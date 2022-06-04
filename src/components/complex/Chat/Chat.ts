import {Block} from '../../common';
import {chatTemplate} from '../../../templates/complex';
import {Avatar} from '../../base';
import {Nullable} from '../../../types';
import emptyAvatar from '../../../../static/images/emptyAvatar.png';
import {chatsController} from '../../../utils/controllers';
import {getHoursMinutes, SocketBuilder} from '../../../utils/handlers';
import store from '../../../utils/main/store';

export type ChatItemType = {
    id: number
    title: string
    avatarSrc: string
    last_message: Nullable<{
        user?: {
            first_name: string
            second_name: string
            avatar: string
            email: string
            login: string
            phone: string
        },
        time: Date
        content: string
    }>
    created_by: number
    unread_count: number
    selected?: boolean
    attr?: {
        id?: string
        class?: string
    }
}

export class Chat extends Block {
    constructor(props: ChatItemType) {
        const src = props.avatarSrc ?? emptyAvatar;

        const avatar = new Avatar({
            attr: {
                class: 'chat-content-avatar',
                src,
                alt: 'ava',
            },
        });

        super('div', {
            ...props,
            last_message: props.last_message ? {
                ...props.last_message,
                time: getHoursMinutes(props.last_message.time),
            } : {
                content: '',
                time: '',
            },
            avatar,
            attr: {
                ...props.attr,
                class: props.attr?.class ?? 'chat-list-item-container',
            },
        });

        this.props.avatarSrc = src;
    }

    _addEvents() {
        if (this._element) {
            const chatItem = this._element.querySelector('.chat-list-item');

            if (chatItem) {
                chatItem.addEventListener('click', this.onChatClick.bind(this));
            }
        }
    }

    async onChatClick() {
        const participants = await chatsController.getChatUsers(this.props.id);

        const token = await chatsController.getChatToken(this.props.id);

        store.set('activeChat', {
            id: this.props.id,
            avatarSrc: this.props.avatarSrc,
            title: this.props.title,
            participants: participants.map(
                (participant: any) => participant.display_name ?? participant.first_name,
            )
                .join(', '),
            token,
        });

        const socket = new SocketBuilder(
            store.getState().user!.id,
            this.props.id,
            token,
        )
            .addOpenEvent()
            .addCloseEvent()
            .addMessageEvent()
            .addErrorEvent()
            .build();

        store.set('socket', socket);

        // this.setProps({selected: true});
    }

    componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>): boolean {
        return oldProps.id !== newProps.id
            || oldProps.name !== newProps.name
            || oldProps.last_message.content !== newProps.last_message.content
            || oldProps.last_message.time !== newProps.last_message.time
            || oldProps.unread_count !== newProps.unread_count
            || oldProps.selected !== newProps.selected;
    }

    render() {
        return this.compile(chatTemplate, {
            id: this.props.id,
            title: this.props.title,
            last_message: this.props.last_message,
            unread_count: this.props.unread_count,
            selected: this.props.selected,
        });
    }
}
