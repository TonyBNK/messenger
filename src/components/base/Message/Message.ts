import {messageTemplate} from '../../../templates/base';
import {Block, IBlock} from '../../common';

export type MessageItemType = {
    id: number
    author: {
        id: number
        name: string
    }
    data: {
        date: string
        time: string
        textContent: string
    }
    attr?: {
        id?: string
        class?: string
    }
}

export interface IMessage extends IBlock {
}

export class Message extends Block {
    constructor(props: MessageItemType) {
        super('div', props);
    }

    render() {
        return this.compile(messageTemplate, {
            id: this.props.id,
            author: this.props.author,
            data: this.props.data,
        });
    }
}
