import {Block} from '../../common';
import {textRowTemplate} from '../../../templates/base';

type TextRowType = {
    label: string
    value: string,
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
