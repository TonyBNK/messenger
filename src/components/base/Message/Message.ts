import {messageTemplate} from '../../../templates/base';
import {Block, IBlock} from '../../common';
import {Nullable} from '../../../types';
import store from '../../../utils/main/store';

export type MessageItemType = {
    chat_id: number
    content: string
    file: Nullable<File>
    id: number
    is_read: boolean
    time: string
    type: 'message'
    user_id: number
    attr?: {
        id?: string
        class?: string
    }
}

export interface IMessage extends IBlock {
}

export class Message extends Block {
    constructor(props: MessageItemType) {
        const userId = store.getState().user?.id;

        super('div', {
            ...props,
            attr: {
                ...props.attr,
                class: props.user_id === userId ? 'my-message' : 'pen-friend-message',
            },
        });
    }

    render() {
        return this.compile(messageTemplate, {
            id: this.props.id,
            content: this.props.content,
            time: this.props.time,
        });
    }
}
