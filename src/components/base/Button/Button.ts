import {Block, IBlock} from '../../common';
import {buttonTemplate} from '../../../templates/base';

type ButtonPropsType = {
    label?: string
    children?: IBlock
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
            children: this.props.children,
        });
    }
}
