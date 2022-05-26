import {Block, IBlock} from '../../common';
import {
    AltUrl, AltUrlPropsType,
    IAltUrl, IButton, Input, TextRow,
} from '../../base';
import {formTemplate} from '../../../templates/complex';
import {render, renderList} from '../../../utils/main';

export type FieldType = {
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

type LinkType = AltUrlPropsType;

type FormPropsType = {
    button?: IButton
    altUrl?: IAltUrl
    fields?: Array<FieldType>
    links?: Array<LinkType>
    readonly?: boolean
    events?: {
        submit?: (e: Event, regex: Record<string, any>) => void
    }
    attr?: {
        id?: string
        class?: string
        method?: string
        name?: string
    }
}

export interface IForm extends IBlock {
}

export class Form extends Block {
    constructor(props: FormPropsType) {
        super('form', props);
    }

    private renderLinks(profile: DocumentFragment) {
        this.props.links.forEach((link: LinkType) => {
            render('.form-links', new AltUrl({
                ...link,
                attr: {
                    ...link.attr,
                    class: 'alt-url',
                },
            }), profile);
        });
    }

    render() {
        const form = this.compile(formTemplate, {
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
