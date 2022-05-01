import {Block, IBlock} from '../../common';
import {
    IAltUrl, IButton, Input, TextRow,
} from '../../base';
import {formTemplate} from '../../../templates/complex';
import {renderList} from '../../../utils/renderDom';

type FieldType = {
    name: string
    label: string
    type: string
    required?: boolean
    autofocus?: boolean
}

type FormPropsType = {
    name: string
    button?: IButton
    altUrl?: IAltUrl
    fields?: Array<FieldType>
    readonly?: boolean
    events?: {
        submit?: (e: Event) => void
    }
}

export interface IForm extends IBlock {
}

export class Form extends Block {
    constructor(props: FormPropsType) {
        super('div', props);
    }

    render() {
        const form = this.compile(formTemplate, {
            name: this.props.name,
            button: this.props.button,
            altUrl: this.props.altUrl,
            fields: this.props.fields,
            readonly: this.props.readonly,
        });

        renderList(form, '.fields-container', this.props.fields, this.props.readonly ? TextRow : Input);

        return form;
    }
}
