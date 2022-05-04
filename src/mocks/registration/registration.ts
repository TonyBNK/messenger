import {FieldType} from '../../components/complex';

export const registrationFields: Array<FieldType> = [
    {
        id: 'registration-first_name',
        name: 'first_name',
        label: 'Имя',
        type: 'text',
    },
    {
        id: 'registration-second_name',
        name: 'second_name',
        label: 'Фамилия',
        type: 'text',
    },
    {
        id: 'registration-login',
        name: 'login',
        label: 'Логин',
        type: 'text',
    },
    {
        id: 'registration-email',
        name: 'email',
        label: 'Почта',
        type: 'email',
    },
    {
        id: 'registration-phone',
        name: 'phone',
        label: 'Телефон',
        type: 'tel',
    },
    {
        id: 'registration-password',
        name: 'password',
        label: 'Пароль',
        type: 'password',
    },
    {
        id: 'registration-password_again',
        name: 'password_again',
        label: 'Пароль ещё раз',
        type: 'password',
    },
];
