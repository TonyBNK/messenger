import {Block, IBlock} from '../../common';
import {buttonTemplate} from '../../../templates/base';

type ButtonPropsType = {
    label?: string
    children?: IBlock
    events?: {
        click?: () => void
    }
    attr?: {
        id?: string
        class?: string
        type?: string
    }
}

export interface IButton extends IBlock {
}

export class Button extends Block {
    constructor(props: ButtonPropsType) {
        super('button', props);
    }

    render() {
        return this.compile(buttonTemplate, {
            label: this.props.label,
            children: this.props.children,
        });
    }
}
