import {AltUrl, Avatar, Button} from '../../components/base';
import {render} from '../../utils/main';
import {Profile} from '../../components/pages';
import {Form} from '../../components/complex';
import {handleSubmit} from '../../utils/handlers';
import {withFocusHandler} from '../../utils/handlers/form/handleFocus';
import {withBlurHandler} from '../../utils/handlers/form/handleBlur';
import {infoFields, passwordFields} from '../../mocks';
import catWithGlasses from '../../../static/images/catWithGlasses.jpg';

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

const infoRows = withFocusHandler(withBlurHandler(infoFields, regex));

const passwordRows = withFocusHandler(withBlurHandler(passwordFields, regex));

const links = [
    {
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
        attr: {
            id: 'changeInfo',
            href: '#',
        },
    },
    {
        label: 'Изменить пароль',
        events: {
            click: () => {
                userProfile.setProps({
                    editMode: true,
                });
                form.setProps({
                    readonly: false,
                    fields: passwordRows,
                });
            },
        },
        attr: {
            id: 'changePassword',
            href: '#',
        },
    },
    {
        label: 'Выйти',
        attr: {
            href: '/',
        },
    },
];

const avatar = new Avatar({
    attr: {
        id: 'profilePhoto',
        class: 'profile-photo',
        src: catWithGlasses,
        alt: 'ава',
    },
});

const button = new Button({
    label: 'Сохранить',
    attr: {
        id: 'saveChanges',
        type: 'submit',
        class: 'main-button',
    },
});

const altUrl = new AltUrl({
    label: 'Назад',
    events: {
        click: () => {
            userProfile.setProps({
                editMode: false,
            });
            form.setProps({
                readonly: true,
                fields: infoRows,
            });
        },
    },
    attr: {
        href: '#',
        class: 'alt-url',
    },
});

const form = new Form({
    fields: infoRows,
    readonly: true,
    links,
    button,
    altUrl,
    events: {
        submit: (e: Event) => handleSubmit(e, regex),
    },
    attr: {
        method: 'post',
        class: 'form-info',
        name: 'profile-form',
    },
});

const userProfile = new Profile({
    avatar,
    name: 'Иван',
    form,
    attr: {
        class: 'window',
    },
});

render('#profile', userProfile);
