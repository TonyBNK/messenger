import {Block} from '../../common';
import {registrationTemplate} from '../../../templates/pages';
import {Form} from '../../complex';
import {AltUrl, Button} from '../../base';
import {FieldsBuilder, handleSubmit} from '../../../utils/handlers';
import {registrationFieldsFactory} from '../../../mocks';

type RegistrationPropsType = {
    formTitle?: string
    fieldsLabels?: {
        firstNameLabel?: string
        secondNameLabel?: string
        loginLabel?: string
        emailLabel?: string
        phoneLabel?: string
        passwordLabel?: string
        passwordAgainLabel?: string
    }
    buttonLabel?: string
    altUrlLabel?: string
    regex?: {
        first_name: string
        second_name: string
        login: string
        password: string
        password_again: string
        email: string
        phone: string
    }
    attr?: {
        id?: string
        class?: string
    }
}

export class Registration extends Block {
    constructor(props: RegistrationPropsType) {
        const {
            fieldsLabels,
            buttonLabel,
            altUrlLabel,
            attr,
        } = props;

        const regex = props.regex ?? {
            first_name: /^[A-ZА-Я][A-zА-я-]+$/u,
            second_name: /^[A-ZА-Я][A-zА-я-]+$/u,
            login: /^(?=.*[a-zA-Z])[\w-]{3,20}$/,
            password: /^(?=.*[A-ZА-Я])(?=.*\d)[\wА-я@$!%*#?&-]{8,40}$/u,
            password_again: /^(?=.*[A-ZА-Я])(?=.*\d)[\wА-я@$!%*#?&-]{8,40}$/u,
            email: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/,
            phone: /^[+]?[0-9]{10,15}$/,
        };

        const button = new Button({
            label: buttonLabel ?? 'Зарегистрироваться',
            attr: {
                type: 'submit',
            },
        });

        const altUrl = new AltUrl({
            label: altUrlLabel ?? 'Войти',
            events: {
                click: () => window.router.go('/'),
            },
        });

        const form = new Form({
            fields: new FieldsBuilder(registrationFieldsFactory(fieldsLabels))
                .withBlurHandler(regex)
                .withFocusHandler()
                .build(),
            button,
            altUrl,
            events: {
                submit: (e: Event) => handleSubmit(e, regex),
            },
            attr: {
                name: 'registration-form',
            },
        });

        super('div', {
            ...props,
            form,
            attr: {
                ...attr,
                class: attr?.class ?? 'registration-window',
            },
        });
    }

    componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>): boolean {
        return oldProps.formTitle !== newProps.formTitle;
    }

    render() {
        return this.compile(registrationTemplate, {
            formTitle: this.props.formTitle ?? 'Регистрация',
        });
    }
}
