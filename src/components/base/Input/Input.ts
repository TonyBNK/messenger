import {Block, IBlock} from '../../common';
import {inputTemplate} from '../../../templates/base';

type InputPropsType = {
    name?: string
    id?: string
    label?: string
    type?: string
    value?: string
    classNameLabel?: string
    classNameInput?: string
    required?: boolean
    autofocus?: boolean
    error?: string
    events?: {
        blur?: (e: Event, regex: Record<string, any>) => void,
        focus?: (e: Event) => void,
    }
}

export interface IInput extends IBlock {
}

export class Input extends Block {
    constructor(props: InputPropsType) {
        super('div', props);
    }

    render() {
        return this.compile(inputTemplate, {
            id: this.props.id,
            name: this.props.name,
            label: this.props.label,
            type: this.props.type,
            value: this.props.value,
            classNameLabel: this.props.classNameLabel,
            classNameInput: this.props.classNameInput,
            required: this.props.required,
            autofocus: this.props.autofocus,
            error: this.props.error,
        });
    }
}
