import Handlebars from 'handlebars';
import mainTemplate from '../../templates/profile/profileMain.hbs';
import buttonsTemplate from '../../templates/profile/profileButtons.hbs';
import infoTemplate from '../../templates/profile/profileInfo.hbs';
import {
    ButtonsDataType,
    ChangeInfoType,
    ChangePasswordType,
    MainDataType,
    ProfileInfoRowType,
    ProfileInfoType,
    ProfilePasswordRowType,
    RenderProfileType,
    SaveChangesType
} from "./types";

const renderProfile: RenderProfileType = (editMode = false, editPassword = false) => {
    const mainData: MainDataType = {
        editMode,
        avatar: '',
        display_name: 'Иван',
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
            firstChild: true
        },
        {
            label: 'Новый пароль',
            name: 'newPassword',
            type: 'password'
        },
        {
            label: 'Повторите новый пароль',
            name: 'newPasswordRepeat',
            type: 'password'
        },
    ];

    const infoRows: Array<ProfileInfoRowType> = [
        {
            label: 'Почта',
            name: 'email',
            value: 'pochta@yandex.ru',
            type: 'email',
            firstChild: true
        },
        {
            label: 'Логин',
            name: 'login',
            value: 'ivanivanov',
            type: 'text'
        },
        {
            label: 'Имя',
            name: 'first_name',
            value: 'Иван',
            type: 'text'
        },
        {
            label: 'Фамилия',
            name: 'second_name',
            value: 'Иванов',
            type: 'text'
        },
        {
            label: 'Имя в чате',
            name: 'display_name',
            value: 'Иван',
            type: 'text'
        },
        {
            label: 'Телефон',
            name: 'phone',
            value: '+7 (909) 967 30 30',
            type: 'tel'
        },
    ];

    const infoData: ProfileInfoType = {
        editMode,
        rows: editPassword ? passwordRows : infoRows,
    };

    Handlebars.registerPartial('profileInfo', infoTemplate(infoData));
    Handlebars.registerPartial('profileButtons', buttonsTemplate(buttonsData));

    const profile = document.getElementById('profile');

    if (profile) {
        profile.innerHTML = mainTemplate(mainData);
    }

    if (!editMode) {
        const info = document.getElementById('changeInfo');

        if (info) {
            info.onclick = changeInfo;
        }


        const password = document.getElementById('changePassword');

        if (password) {
            password.onclick = changePassword;
        }
    } else {
        const save = document.getElementById('saveChanges');

        if (save) {
            save.onclick = saveChanges;
        }
    }
}

const changeInfo: ChangeInfoType = (e) => {
    e.preventDefault();
    renderProfile(true);
}

const changePassword: ChangePasswordType = (e) => {
    e.preventDefault();
    renderProfile(true, true);
}

const saveChanges: SaveChangesType = () => {
    renderProfile();
}

renderProfile();
