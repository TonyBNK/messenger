import {Block, IBlock} from '../../common';
import {inputTemplate} from '../../../templates/base';

type InputPropsType = {
    name?: string
    label?: string
    type?: string
    classNameLabel?: string
    classNameInput?: string
    required?: boolean
    autofocus?: boolean
}

export interface IInput extends IBlock {
}

export class Input extends Block {
    constructor(props: InputPropsType) {
        super('div', props);
    }

    render() {
        return this.compile(inputTemplate, {
            name: this.props.name,
            label: this.props.label,
            type: this.props.type,
            classNameLabel: this.props.classNameLabel,
            classNameInput: this.props.classNameInput,
            required: this.props.required,
            autofocus: this.props.autofocus,
        });
    }
}
