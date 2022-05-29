import {FieldType} from '../../components/complex';

type RegistrationFieldsFactoryType = (
    data?: {
        firstNameLabel?: string
        secondNameLabel?: string
        loginLabel?: string
        emailLabel?: string
        phoneLabel?: string
        passwordLabel?: string
        passwordAgainLabel?: string
    }
) => Array<FieldType>;

export const registrationFieldsFactory: RegistrationFieldsFactoryType = (data) => [
    {
        id: 'registration-first_name',
        name: 'first_name',
        label: data?.firstNameLabel ?? 'Имя',
        type: 'text',
    },
    {
        id: 'registration-second_name',
        name: 'second_name',
        label: data?.secondNameLabel ?? 'Фамилия',
        type: 'text',
    },
    {
        id: 'registration-login',
        name: 'login',
        label: data?.loginLabel ?? 'Логин',
        type: 'text',
    },
    {
        id: 'registration-email',
        name: 'email',
        label: data?.emailLabel ?? 'Почта',
        type: 'email',
    },
    {
        id: 'registration-phone',
        name: 'phone',
        label: data?.phoneLabel ?? 'Телефон',
        type: 'tel',
    },
    {
        id: 'registration-password',
        name: 'password',
        label: data?.passwordLabel ?? 'Пароль',
        type: 'password',
    },
    {
        id: 'registration-password_again',
        name: 'password_again',
        label: data?.passwordAgainLabel ?? 'Пароль ещё раз',
        type: 'password',
    },
];
