import {Form} from '../../components/complex';
import {render} from '../../utils/main';
import {AltUrl, Button} from '../../components/base';
import {Registration} from '../../components/pages';
import {handleSubmit} from '../../utils/handlers';
import {withFocusHandler} from '../../utils/handlers/form/handleFocus';
import {withBlurHandler} from '../../utils/handlers/form/handleBlur';
import {registrationFields} from '../../mocks';

const regex = {
    first_name: /^[A-ZА-Я][A-zА-я-]+$/u,
    second_name: /^[A-ZА-Я][A-zА-я-]+$/u,
    login: /^(?=.*[a-zA-Z])[\w-]{3,20}$/,
    password: /^(?=.*[A-ZА-Я])(?=.*\d)[\wА-я@$!%*#?&-]{8,40}$/u,
    password_again: /^(?=.*[A-ZА-Я])(?=.*\d)[\wА-я@$!%*#?&-]{8,40}$/u,
    email: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/,
    phone: /^[+]?[0-9]{10,15}$/,
};

const button = new Button({
    type: 'submit',
    label: 'Зарегистрироваться',
});

const altUrl = new AltUrl({
    href: '../login/login.html',
    label: 'Войти',
});

const form = new Form({
    fields: withFocusHandler(withBlurHandler(registrationFields, regex)),
    button,
    altUrl,
    name: 'registration-form',
    events: {
        submit: (e: Event) => handleSubmit(e, regex),
    },
});

const registration = new Registration({
    title: 'Регистрация',
    form,
});

render('#registration', registration);
