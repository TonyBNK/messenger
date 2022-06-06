import {Block} from '../../common';
import {registrationTemplate} from '../../../templates/pages';
import {Form} from '../../complex';
import {AltUrl, Button} from '../../base';
import {FieldsBuilder} from '../../../utils/handlers';
import {registrationFieldsFactory} from '../../../mocks';
import {authController} from '../../../utils/controllers';
import {regexRules, router} from '../../../utils/main';

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

        const {
            first_name,
            second_name,
            login,
            password,
            password_again,
            email,
            phone,
        } = regexRules.rules;

        const regex = props.regex ?? {
            first_name,
            second_name,
            login,
            password,
            password_again,
            email,
            phone,
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
                click: () => router.go('/'),
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
                submit: (e: Event) => authController.signUp(e, regex),
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
