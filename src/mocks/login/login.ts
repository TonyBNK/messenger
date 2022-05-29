import {FieldType} from '../../components/complex';

type LoginFieldsFactoryType = (
    data?: {
        loginLabel?: string
        passwordLabel?: string
    }
) => Array<FieldType>;

export const loginFieldsFactory: LoginFieldsFactoryType = (data) => [
    {
        id: 'login-login',
        name: 'login',
        label: data?.loginLabel ?? 'Логин',
        type: 'text',
    },
    {
        id: 'login-password',
        name: 'password',
        label: data?.passwordLabel ?? 'Пароль',
        type: 'password',
    },
];
