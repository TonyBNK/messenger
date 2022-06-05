import {Block} from '../../common';
import {loginTemplate} from '../../../templates/pages';
import {Form} from '../../complex';
import {AltUrl, Button} from '../../base';
import {FieldsBuilder} from '../../../utils/handlers';
import {loginFieldsFactory} from '../../../mocks';
import {authController} from '../../../utils/controllers';
import {regexRules, router} from '../../../utils/main';
import {isEqual} from '../../../utils/mydash';
import store from '../../../utils/main/store';

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

        const {
            login,
            password,
        } = regexRules.rules;

        const regex = props.regex ?? {
            login,
            password,
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

        authController.getUserInfo()
            .then(() => {
                if (store.getState().user) {
                    router.go('/messenger');
                }
            });
    }

    componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>): boolean {
        if (!oldProps.user || !newProps.user) return oldProps.user !== newProps.user;
        if (!isEqual(oldProps.user, newProps.user)) return true;
        return oldProps.formTitle !== newProps.formTitle;
    }

    render() {
        return this.compile(loginTemplate, {
            formTitle: this.props.formTitle ?? 'Авторизация',
        });
    }
}
