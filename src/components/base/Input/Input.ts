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

    _addEvents() {
        const {events = {}} = this.props;

        Object
            .keys(events)
            .forEach((eventName) => {
                if (this._element) {
                    if (eventName === 'focus' || eventName === 'blur') {
                        this._element.querySelectorAll('input')
                            .forEach((input) => {
                                input.addEventListener(eventName, events[eventName]);
                            });
                    }
                }
            });
    }

    _deleteEvents() {
        const {events = {}} = this.props;

        Object
            .keys(events)
            .forEach((eventName) => {
                if (this._element) {
                    if (eventName === 'focus' || eventName === 'blur') {
                        this._element.querySelectorAll('input')
                            .forEach((input) => {
                                input.removeEventListener(eventName, events[eventName]);
                            });
                    }
                }
            });
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
