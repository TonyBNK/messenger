import {Block, IBlock} from '../../common';
import {textRowTemplate} from '../../../templates/base';

type TextRowType = {
    label: string
    value: string,
}

export interface ITextRow extends IBlock {
}

export class TextRow extends Block {
    constructor(props: TextRowType) {
        super('div', props);
    }

    render() {
        return this.compile(textRowTemplate, {
            label: this.props.label,
            value: this.props.value,
        });
    }
}
