import {FieldType} from '../../components/complex';

export const infoFields: Array<FieldType> = [
    {
        id: 'profile-email',
        label: 'Почта',
        name: 'email',
        value: 'pochta@yandex.ru',
        type: 'email',
    },
    {
        id: 'profile-login',
        label: 'Логин',
        name: 'login',
        value: 'ivanivanov',
        type: 'text',
    },
    {
        id: 'profile-first_name',
        label: 'Имя',
        name: 'first_name',
        value: 'Иван',
        type: 'text',
    },
    {
        id: 'profile-second_name',
        label: 'Фамилия',
        name: 'second_name',
        value: 'Иванов',
        type: 'text',
    },
    {
        id: 'profile-display_name',
        label: 'Имя в чате',
        name: 'display_name',
        value: 'Иван',
        type: 'text',
    },
    {
        id: 'profile-phone',
        label: 'Телефон',
        name: 'phone',
        value: '+79099673030',
        type: 'tel',
    },
];

export const passwordFields: Array<FieldType> = [
    {
        id: 'profile-oldPassword',
        label: 'Старый пароль',
        name: 'oldPassword',
        type: 'password',
    },
    {
        id: 'profile-newPassword',
        label: 'Новый пароль',
        name: 'newPassword',
        type: 'password',
    },
    {
        id: 'profile-newPassword_again',
        label: 'Повторите новый пароль',
        name: 'newPassword_again',
        type: 'password',
    },
];
