import {passwordValidate} from './passwordValidate';
import {FieldType} from '../../../components/complex';

export const handleBlur = (e: Event, regex: Record<string, any>) => {
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

export const withBlurHandler = (
    fields: Array<FieldType>,
    regex: Record<string, any>,
): Array<FieldType> => fields.map((field) => ({
    ...field,
    events: {
        ...field.events,
        blur: (e: Event) => handleBlur(e, regex),
    },
}));
