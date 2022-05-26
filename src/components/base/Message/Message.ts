import {messageTemplate} from '../../../templates/base';
import {Block, IBlock} from '../../common';

export type MessagePropsType = {
    text: string
    time: string
    attr?: {
        id?: string
        class?: string
    }
}

export interface IMessage extends IBlock {
}

export class Message extends Block {
    constructor(props: MessagePropsType) {
        super('div', props);
    }

    render() {
        return this.compile(messageTemplate, {
            text: this.props.text,
            time: this.props.time,
        });
    }
}
