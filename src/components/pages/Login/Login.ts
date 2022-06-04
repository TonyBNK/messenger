import {Block} from '../../common';
import {loginTemplate} from '../../../templates/pages';
import {Form} from '../../complex';
import {AltUrl, Button} from '../../base';
import {FieldsBuilder} from '../../../utils/handlers';
import {loginFieldsFactory} from '../../../mocks';
import {authController} from '../../../utils/controllers';
import {router} from '../../../utils/main';

type LoginPropsType = {
    formTitle?: string
    fieldsLabels?: {
        loginLabel?: string
        passwordLabel?: string
    }
    buttonLabel?: string
    altUrlLabel?: string
    regex?: {
        login: string
        password: string
    }
    attr?: {
        id?: string
        class?: string
    }
}

export class Login extends Block {
    constructor(props: LoginPropsType) {
        const {
            fieldsLabels,
            buttonLabel,
            altUrlLabel,
            attr,
        } = props;

        const regex = props.regex ?? {
            login: /^(?=.*[a-zA-Z])[\w-]{3,20}$/,
            password: /^(?=.*[A-Z])(?=.*\d)[\w@$!%*#?&-]{8,40}$/,
        };

        const button = new Button({
            label: buttonLabel ?? 'Вход',
            attr: {
                type: 'submit',
            },
        });

        const altUrl = new AltUrl({
            label: altUrlLabel ?? 'Ещё не зарегистрированы?',
            events: {
                click: () => router.go('/sign-up'),
            },
        });

        const form = new Form({
            fields: new FieldsBuilder(loginFieldsFactory(fieldsLabels))
                .withBlurHandler(regex)
                .withFocusHandler()
                .build(),
            button,
            altUrl,
            events: {
                submit: (e: Event) => authController.signIn(e, regex),
            },
            attr: {
                name: 'login-form',
            },
        });

        super('div', {
            ...props,
            form,
            attr: {
                ...attr,
                class: attr?.class ?? 'login-window',
            },
        });
    }

    componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>): boolean {
        return oldProps.formTitle !== newProps.formTitle;
    }

    render() {
        return this.compile(loginTemplate, {
            formTitle: this.props.formTitle ?? 'Авторизация',
        });
    }
}
