import {Block} from '../../common';
import {Input, IButton, IAltUrl} from '../../base';
import {render} from '../../../utils/renderDom';
import {formTemplate} from '../../../templates/complex';

type FieldType = {
    name: string
    label: string
    type: string
    required: boolean
}

type FormPropsType = {
    title: string
    button: IButton
    altUrl: IAltUrl
    fields: Array<FieldType>
}

export class Form extends Block {
    constructor(props: FormPropsType) {
        super('div', props);
    }

    private renderFields(form: DocumentFragment) {
        this.props.fields.forEach((field: FieldType) => {
            render('.form-field-container', new Input({
                ...field,
                classNameLabel: 'field-title',
                classNameInput: 'field-input',
            }), form);
        });
    }

    render() {
        const form = this.compile(formTemplate, {
            title: this.props.title,
            button: this.props.button,
            altUrl: this.props.altUrl,
            fields: this.props.fields,
        });

        this.renderFields(form);

        return form;
    }
}
