import {Block} from '../../common';
import {buttonTemplate} from '../../../templates/base';
import {IBlock} from '../../common/Block/Block';

type ButtonPropsType = {
    label: string
    id?: string
    type?: string
    className?: string
    events?: {
        click?: () => void
    }
}

export interface IButton extends IBlock {
}

export class Button extends Block {
    constructor(props: ButtonPropsType) {
        super('span', props);
    }

    render() {
        return this.compile(buttonTemplate, {
            id: this.props.id,
            type: this.props.type,
            className: this.props.className,
            label: this.props.label,
        });
    }
}
