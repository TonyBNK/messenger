import {passwordValidate} from './passwordValidate';
import {FieldType} from '../../../components/complex';

const handleBlur = (e: Event, regex: Record<string, any>) => {
    const {
        value,
        classList,
        name,
        id,
    } = e.target as HTMLInputElement;

    if (!regex[name].test(value) || !passwordValidate(id)) {
        classList.add('invalid');
        const errorMessage = document.getElementById(`${name}-error-message`);
        if (errorMessage) {
            errorMessage.textContent = `Некорректное поле ${name}`;
        }
    }
};

const handleFocus = (e: Event) => {
    const {
        classList,
        name,
    } = e.target as HTMLInputElement;

    if (classList.contains('invalid')) {
        classList.remove('invalid');
        const errorMessage = document.getElementById(`${name}-error-message`);
        if (errorMessage) {
            errorMessage.textContent = '';
        }
    }
};

export class FieldsBuilder {
    fields: Array<FieldType> = [];

    constructor(fields: Array<FieldType>) {
        this.fields = fields;
    }

    withBlurHandler(regex: Record<string, any>) {
        this.fields.map((field) => ({
            ...field,
            events: {
                ...field.events,
                blur: (e: Event) => handleBlur(e, regex),
            },
        }));

        return this;
    }

    withFocusHandler() {
        this.fields.map((field) => ({
            ...field,
            events: {
                ...field.events,
                focus: handleFocus,
            },
        }));

        return this;
    }

    build = () => this.fields;
}
