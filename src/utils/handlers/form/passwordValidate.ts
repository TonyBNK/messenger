export const passwordValidate = (passwordId: string): boolean => {
    if (passwordId.indexOf('assword_again') > -1) {
        const password = document.getElementById(passwordId.split('_')[0]) as HTMLInputElement;
        const passwordAgain = document.getElementById(passwordId) as HTMLInputElement;

        if (password && passwordAgain) {
            return passwordAgain.value === password.value;
        }
    }

    return true;
};
