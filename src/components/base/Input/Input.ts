import {Block} from '../../common';
import {inputTemplate} from '../../../templates/base';

export class Input extends Block {
    constructor(props: Record<string, any>) {
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
        });
    }
}
