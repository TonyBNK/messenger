import {messageTemplate} from '../../../templates/base';
import {Block, IBlock} from '../../common';

type MessagePropsType = {
    id?: string
    text: string
    time: string
    className?: string
}

export interface IMessage extends IBlock {
}

export class Message extends Block {
    constructor(props: MessagePropsType) {
        super('div', props);
    }

    render() {
        return this.compile(messageTemplate, {
            id: this.props.id,
            text: this.props.text,
            time: this.props.time,
            className: this.props.className,
        });
    }
}
