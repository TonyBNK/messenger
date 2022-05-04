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
    type: 'submit',
    label: 'Вход',
});

const altUrl = new AltUrl({
    href: '../registration/registration.html',
    label: 'Ещё не зарегистрированы?',
});

const form = new Form({
    name: 'login-form',
    fields: withFocusHandler(withBlurHandler(loginFields, regex)),
    button,
    altUrl,
    events: {
        submit: (e: Event) => handleSubmit(e, regex),
    },
});

const login = new Login({
    title: 'Авторизация',
    form,
});

render('#login-page', login);
