import {FieldType} from '../../components/complex';
import store from '../../utils/main/store';

type InfoFieldsFactoryType = (
    data?: {
        emailLabel?: string
        loginLabel?: string
        firstNameLabel?: string
        secondNameLabel?: string
        displayNameLabel?: string
        phoneLabel?: string
    }
) => Array<FieldType>;

type PasswordFieldsFactoryType = (
    data?: {
        oldPasswordLabel?: string
        newPasswordLabel?: string
        newPasswordAgainLabel?: string
    }
) => Array<FieldType>;

export const infoFieldsFactory: InfoFieldsFactoryType = (data) => [
    {
        id: 'profile-email',
        label: data?.emailLabel ?? 'Почта',
        name: 'email',
        value: store.getState().user?.email ?? '',
        type: 'email',
    },
    {
        id: 'profile-login',
        label: data?.loginLabel ?? 'Логин',
        name: 'login',
        value: store.getState().user?.login ?? '',
        type: 'text',
    },
    {
        id: 'profile-first_name',
        label: data?.firstNameLabel ?? 'Имя',
        name: 'first_name',
        value: store.getState().user?.first_name ?? '',
        type: 'text',
    },
    {
        id: 'profile-second_name',
        label: data?.secondNameLabel ?? 'Фамилия',
        name: 'second_name',
        value: store.getState().user?.second_name ?? '',
        type: 'text',
    },
    {
        id: 'profile-display_name',
        label: data?.displayNameLabel ?? 'Имя в чате',
        name: 'display_name',
        value: store.getState().user?.display_name ?? '',
        type: 'text',
    },
    {
        id: 'profile-phone',
        label: data?.phoneLabel ?? 'Телефон',
        name: 'phone',
        value: store.getState().user?.phone ?? '',
        type: 'tel',
    },
];

export const passwordFieldsFactory: PasswordFieldsFactoryType = (data) => [
    {
        id: 'profile-oldPassword',
        label: data?.oldPasswordLabel ?? 'Старый пароль',
        name: 'oldPassword',
        type: 'password',
    },
    {
        id: 'profile-newPassword',
        label: data?.newPasswordLabel ?? 'Новый пароль',
        name: 'newPassword',
        type: 'password',
    },
    {
        id: 'profile-newPassword_again',
        label: data?.newPasswordAgainLabel ?? 'Повторите новый пароль',
        name: 'newPassword_again',
        type: 'password',
    },
];
