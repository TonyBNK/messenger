import {Block, IBlock} from '../../common';
import {chatTemplate} from '../../../templates/base';

type ChatPropsType = {
    id?: string
    avatar: string
    name: string
    lastMessage: string
    lastMessageTime: string
    unreadMessages?: number
    selected?: boolean
}

export interface IChat extends IBlock {
}

export class Chat extends Block {
    constructor(props: ChatPropsType) {
        super('div', props);
    }

    render() {
        return this.compile(chatTemplate, {
            id: this.props.id,
            avatar: this.props.avatar,
            name: this.props.name,
            lastMessage: this.props.lastMessage,
            lastMessageTime: this.props.lastMessageTime,
            unreadMessages: this.props.unreadMessages,
            selected: this.props.selected,
        });
    }
}
