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
        super('button', {
            ...props,
            attr: {
                ...props.attr,
                class: props.attr?.class ?? 'main-button',
            },
        });
    }

    render() {
        return this.compile(buttonTemplate, {
            label: this.props.label,
        });
    }
}
