import Handlebars from 'handlebars';
import {
    ButtonsDataType,
    MainDataType,
    ProfileInfoRowType,
    ProfileInfoType,
    ProfilePasswordRowType,
    RenderProfileType,
} from './types';
import {
    profileButtonsTemplate,
    profileInfoTemplate,
    profileMainTemplate,
} from '../../templates/complex';

const renderProfile: RenderProfileType = (editMode = false, editPassword = false) => {
    const mainData: MainDataType = {
        editMode,
        avatar: '',
        displayName: 'Иван',
    };

    const buttonsData: ButtonsDataType = {
        editMode,
        quit: '/',
        buttonLabel: 'Сохранить',
    };

    const passwordRows: Array<ProfilePasswordRowType> = [
        {
            label: 'Старый пароль',
            name: 'oldPassword',
            type: 'password',
            firstChild: true,
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

    const infoRows: Array<ProfileInfoRowType> = [
        {
            label: 'Почта',
            name: 'email',
            value: 'pochta@yandex.ru',
            type: 'email',
            firstChild: true,
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

    const infoData: ProfileInfoType = {
        editMode,
        rows: editPassword ? passwordRows : infoRows,
    };

    Handlebars.registerPartial('profileInfo', profileInfoTemplate(infoData));
    Handlebars.registerPartial('profileButtons', profileButtonsTemplate(buttonsData));

    const profile = document.getElementById('profile');

    if (profile) {
        profile.innerHTML = profileMainTemplate(mainData);
    }

    if (!editMode) {
        const info = document.getElementById('changeInfo');

        if (info) {
            info.onclick = (e) => {
                e.preventDefault();
                renderProfile(true);
            };
        }

        const password = document.getElementById('changePassword');

        if (password) {
            password.onclick = (e) => {
                e.preventDefault();
                renderProfile(true, true);
            };
        }
    } else {
        const save = document.getElementById('saveChanges');

        if (save) {
            save.onclick = () => {
                renderProfile();
            };
        }
    }
};

renderProfile();
