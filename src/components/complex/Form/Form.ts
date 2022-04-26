import {Block} from '../../common';
import {Input} from '../../base';
import {render} from '../../../utils/renderDom';
import {formTemplate} from '../../../templates/complex';

export class Form extends Block {
    constructor(props: Record<string, any>) {
        super('div', props);
    }

    render() {
        const form = this.compile(formTemplate, {
            title: this.props.title,
            button: this.props.button,
            altUrl: this.props.altUrl,
            fields: this.props.fields,
        });

        this.props.fields.forEach((field: Record<string, any>) => {
            render('.form-field-container', new Input({
                ...field,
                classNameLabel: 'field-title',
                classNameInput: 'field-input',
            }), form);
        });

        return form;
    }
}
