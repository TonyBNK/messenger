import {Block, IBlock} from '../../common';
import {
    AltUrl,
    IAltUrl, IButton, Input, TextRow,
} from '../../base';
import {formTemplate} from '../../../templates/complex';
import {render, renderList} from '../../../utils/renderDom';

type FieldType = {
    name: string
    label?: string
    type: string
    required?: boolean
    autofocus?: boolean
}

type LinkType = {
    href: string
    label: string
    id?: string
    events?: {
        click?: () => void
    }
}

type FormPropsType = {
    name: string
    button?: IButton
    altUrl?: IAltUrl
    fields?: Array<FieldType>
    links?: Array<LinkType>
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

    private renderLinks(profile: DocumentFragment) {
        this.props.links.forEach((link: LinkType) => {
            render('.form-links', new AltUrl({
                ...link,
                className: 'alt-url',
            }), profile);
        });
    }

    render() {
        const form = this.compile(formTemplate, {
            name: this.props.name,
            button: this.props.button,
            altUrl: this.props.altUrl,
            fields: this.props.fields,
            readonly: this.props.readonly,
        });

        if (this.props.readonly) {
            this.renderLinks(form);
        }

        renderList(form, '.fields-container', this.props.fields, this.props.readonly ? TextRow : Input);

        return form;
    }
}
