import {FieldType} from '../../../components/complex';

export const handleFocus = (e: Event) => {
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

export const withFocusHandler = (
    fields: Array<FieldType>,
): Array<FieldType> => fields.map((field) => ({
    ...field,
    events: {
        ...field.events,
        focus: handleFocus,
    },
}));
