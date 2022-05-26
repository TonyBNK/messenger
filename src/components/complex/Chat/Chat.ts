import {Block, IBlock} from '../../common';
import {chatTemplate} from '../../../templates/complex';

type ChatPropsType = {
    avatar: string
    name: string
    lastMessage: string
    lastMessageTime: string
    unreadMessages?: number
    selected?: boolean
    attr?: {
        id?: string
        class?: string
    }
}

export interface IChat extends IBlock {
}

export class Chat extends Block {
    constructor(props: ChatPropsType) {
        super('div', props);
    }

    render() {
        return this.compile(chatTemplate, {
            avatar: this.props.avatar,
            name: this.props.name,
            lastMessage: this.props.lastMessage,
            lastMessageTime: this.props.lastMessageTime,
            unreadMessages: this.props.unreadMessages,
            selected: this.props.selected,
        });
    }
}
