import {AltUrl, Avatar, Button} from '../../components/base';
import {render} from '../../utils/main';
import {Profile} from '../../components/pages';
import {Form} from '../../components/complex';
import {handleSubmit} from '../../utils/handlers';
import {withFocusHandler} from '../../utils/handlers/form/handleFocus';
import {withBlurHandler} from '../../utils/handlers/form/handleBlur';
import {infoFields, passwordFields} from '../../mocks';

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
                    fields: passwordRows,
                });
            },
        },
    },
    {
        href: '/',
        label: 'Выйти',
    },
];

const avatar = new Avatar({id: 'profilePhoto'});

const button = new Button({
    id: 'saveChanges',
    type: 'submit',
    label: 'Сохранить',
});

const altUrl = new AltUrl({
    href: '#',
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
});

const form = new Form({
    name: 'profile-form',
    fields: infoRows,
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
