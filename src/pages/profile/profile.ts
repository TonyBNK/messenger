import {AltUrl, Avatar, Button} from '../../components/base';
import {render} from '../../utils/renderDom';
import {Profile} from '../../components/pages';
import {FieldType, Form} from '../../components/complex';
import {handleBlur, handleFocus, handleSubmit} from '../../utils/handlers';

const regex = {
    first_name: /^[A-ZА-Я][A-zА-я-]+$/u,
    second_name: /^[A-ZА-Я][A-zА-я-]+$/u,
    display_name: /^[A-ZА-Я][A-zА-я-]+$/u,
    login: /^(?=.*[a-zA-Z])[\w-]{3,20}$/,
    oldPassword: /^(?=.*[A-ZА-Я])(?=.*\d)[\wА-я@$!%*#?&-]{8,40}$/u,
    newPassword: /^(?=.*[A-ZА-Я])(?=.*\d)[\wА-я@$!%*#?&-]{8,40}$/u,
    newPassword_again: /^(?=.*[A-ZА-Я])(?=.*\d)[\wА-я@$!%*#?&-]{8,40}$/u,
    email: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/,
    phone: /^[+]?[0-9]{10,15}$/,
};

const infoFields: Array<FieldType> = [
    {
        id: 'profile-email',
        label: 'Почта',
        name: 'email',
        value: 'pochta@yandex.ru',
        type: 'email',
        events: {
            blur: (e: Event) => handleBlur(e, regex),
            focus: handleFocus,
        },
    },
    {
        id: 'profile-login',
        label: 'Логин',
        name: 'login',
        value: 'ivanivanov',
        type: 'text',
        events: {
            blur: (e: Event) => handleBlur(e, regex),
            focus: handleFocus,
        },
    },
    {
        id: 'profile-first_name',
        label: 'Имя',
        name: 'first_name',
        value: 'Иван',
        type: 'text',
        events: {
            blur: (e: Event) => handleBlur(e, regex),
            focus: handleFocus,
        },
    },
    {
        id: 'profile-second_name',
        label: 'Фамилия',
        name: 'second_name',
        value: 'Иванов',
        type: 'text',
        events: {
            blur: (e: Event) => handleBlur(e, regex),
            focus: handleFocus,
        },
    },
    {
        id: 'profile-display_name',
        label: 'Имя в чате',
        name: 'display_name',
        value: 'Иван',
        type: 'text',
        events: {
            blur: (e: Event) => handleBlur(e, regex),
            focus: handleFocus,
        },
    },
    {
        id: 'profile-phone',
        label: 'Телефон',
        name: 'phone',
        value: '+79099673030',
        type: 'tel',
        events: {
            blur: (e: Event) => handleBlur(e, regex),
            focus: handleFocus,
        },
    },
];

const passwordFields: Array<FieldType> = [
    {
        id: 'profile-oldPassword',
        label: 'Старый пароль',
        name: 'oldPassword',
        type: 'password',
        events: {
            blur: (e: Event) => handleBlur(e, regex),
            focus: handleFocus,
        },
    },
    {
        id: 'profile-newPassword',
        label: 'Новый пароль',
        name: 'newPassword',
        type: 'password',
        events: {
            blur: (e: Event) => handleBlur(e, regex),
            focus: handleFocus,
        },
    },
    {
        id: 'profile-newPassword_again',
        label: 'Повторите новый пароль',
        name: 'newPassword_again',
        type: 'password',
        events: {
            blur: (e: Event) => handleBlur(e, regex),
            focus: handleFocus,
        },
    },
];

const links = [
    {
        id: 'changeInfo',
        href: '#',
        label: 'Изменить данные',
        events: {
            click: () => {
                userProfile.setProps({
                    editMode: true,
                });
                form.setProps({
                    readonly: false,
                });
            },
        },
    },
    {
        id: 'changePassword',
        href: '#',
        label: 'Изменить пароль',
        events: {
            click: () => {
                userProfile.setProps({
                    editMode: true,
                });
                form.setProps({
                    readonly: false,
                    fields: passwordFields,
                });
            },
        },
    },
    {
        href: '/',
        label: 'Выйти',
    },
];

const avatar = new Avatar({
    id: 'profilePhoto',
    className: 'profile-photo',
});

const button = new Button({
    id: 'saveChanges',
    type: 'submit',
    className: 'main-button',
    label: 'Сохранить',
});

const altUrl = new AltUrl({
    href: '#',
    className: 'alt-url',
    label: 'Назад',
    events: {
        click: () => {
            userProfile.setProps({
                editMode: false,
            });
            form.setProps({
                readonly: true,
                fields: infoFields,
            });
        },
    },
});

const form = new Form({
    name: 'profile-form',
    fields: infoFields,
    readonly: true,
    links,
    button,
    altUrl,
    events: {
        submit: (e: Event) => handleSubmit(e, regex),
    },
});

const userProfile = new Profile({
    avatar,
    name: 'Иван',
    form,
});

render('#profile', userProfile);
