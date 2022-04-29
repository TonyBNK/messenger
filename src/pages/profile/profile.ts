import {Avatar, Button} from '../../components/base';
import {Profile} from '../../components/complex';
import {render} from '../../utils/renderDom';

const infoFields = [
    {
        label: 'Почта',
        name: 'email',
        value: 'pochta@yandex.ru',
        type: 'email',
        autofocus: true,
    },
    {
        label: 'Логин',
        name: 'login',
        value: 'ivanivanov',
        type: 'text',
    },
    {
        label: 'Имя',
        name: 'first_name',
        value: 'Иван',
        type: 'text',
    },
    {
        label: 'Фамилия',
        name: 'second_name',
        value: 'Иванов',
        type: 'text',
    },
    {
        label: 'Имя в чате',
        name: 'display_name',
        value: 'Иван',
        type: 'text',
    },
    {
        label: 'Телефон',
        name: 'phone',
        value: '+7 (909) 967 30 30',
        type: 'tel',
    },
];

const passwordFields = [
    {
        label: 'Старый пароль',
        name: 'oldPassword',
        type: 'password',
        autofocus: true,
    },
    {
        label: 'Новый пароль',
        name: 'newPassword',
        type: 'password',
    },
    {
        label: 'Повторите новый пароль',
        name: 'newPasswordRepeat',
        type: 'password',
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
    events: {
        click: () => {
            userProfile.setProps({
                editMode: false,
                fields: infoFields,
            });
        },
    },
});

const userProfile = new Profile({
    avatar,
    name: 'Иван',
    fields: infoFields,
    links,
    button,
});

render('#profile', userProfile);
