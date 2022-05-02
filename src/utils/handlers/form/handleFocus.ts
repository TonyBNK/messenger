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
