import {Form} from '../../components/complex';
import {AltUrl, Button} from '../../components/base';
import {render} from '../../utils/main';
import {Login} from '../../components/pages';
import {handleSubmit} from '../../utils/handlers';
import {withBlurHandler} from '../../utils/handlers/form/handleBlur';
import {withFocusHandler} from '../../utils/handlers/form/handleFocus';
import {loginFields} from '../../mocks';

const regex = {
    login: /^(?=.*[a-zA-Z])[\w-]{3,20}$/,
    password: /^(?=.*[A-Z])(?=.*\d)[\w@$!%*#?&-]{8,40}$/,
};

const button = new Button({
    label: 'Вход',
    attr: {
        class: 'main-button',
        type: 'submit',
    },
});

const altUrl = new AltUrl({
    label: 'Ещё не зарегистрированы?',
    attr: {
        href: '../registration/registration.html',
        class: 'alt-url',
    },
});

const form = new Form({
    fields: withFocusHandler(withBlurHandler(loginFields, regex)),
    button,
    altUrl,
    events: {
        submit: (e: Event) => handleSubmit(e, regex),
    },
    attr: {
        name: 'login-form',
        class: 'form-info',
    },
});

const login = new Login({
    title: 'Авторизация',
    form,
    attr: {
        class: 'window',
    },
});

render('#login-page', login);
