import {Block} from '../../common';
import {modalTemplate} from '../../../templates/complex';
import {FieldType, Form} from '../Form/Form';
import {Button} from '../../base';

type ModalPropsType = {
    formTitle?: string
    buttonLabel?: string
    fields?: Array<FieldType>
    regex?: {
        login: string
        password: string
    }
    attr?: {
        id?: string
        class?: string
    }
    events?: {
        submit?: (e: Event, regex: Record<string, any>) => void
    }
}

export class Modal extends Block {
    constructor(props: ModalPropsType) {
        const {
            buttonLabel,
            fields,
        } = props;

        const button = new Button({
            label: buttonLabel,
            attr: {
                type: 'submit',
            },
        });

        const form = new Form({
            fields,
            button,
            events: {
                submit: props.events?.submit,
            },
            attr: {
                name: 'modal-form',
            },
        });

        super('div', {
            ...props,
            form,
            attr: {
                ...props.attr,
                class: 'modal-window',
            },
        });
    }

    open(e: Event) {
        e.stopPropagation();

        if (this._element) {
            this._element.style.display = 'flex';
        }
    }

    close(e: Event) {
        e.stopImmediatePropagation();

        const modal = (e.target as HTMLFormElement);

        if (modal.className === 'modal-window') {
            modal.style.display = 'none';
        }
    }

    render() {
        return this.compile(modalTemplate, {
            formTitle: this.props.formTitle,
        });
    }
}
