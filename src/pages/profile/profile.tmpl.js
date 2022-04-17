import headTemplate from '../../templates/profile/profileMain.hbs';
import buttonsTemplate from '../../templates/profile/profileButtons.hbs';
import infoTemplate from '../../templates/profile/profileInfo.hbs';


const renderProfile = (editMode = false, editPassword = false) => {
    const headData = {
        editMode,
        avatar: '',
        display_name: 'Иван'
    }

    const buttonsData = {
        editMode,
        quit: '/',
        buttonLabel: 'Сохранить'
    }

    const infoData = {
        editMode,
        rows: editPassword
            ? [
                {label: 'Старый пароль', name: 'oldPassword', type: 'password', firstChild: true},
                {label: 'Новый пароль', name: 'newPassword', type: 'password'},
                {label: 'Повторите новый пароль', name: 'newPasswordRepeat', type: 'password'}
            ]
            : [
            {label: 'Почта', name: 'email', value: 'pochta@yandex.ru', type: 'email', firstChild: true},
            {label: 'Логин', name: 'login', value: 'ivanivanov', type: 'text'},
            {label: 'Имя', name: 'first_name', value: 'Иван', type: 'text'},
            {label: 'Фамилия', name: 'second_name', value: 'Иванов', type: 'text'},
            {label: 'Имя в чате', name: 'display_name', value: 'Иван', type: 'text'},
            {label: 'Телефон', name: 'phone', value: '+7 (909) 967 30 30', type: 'tel'}
        ]
    }

    document
        .getElementById('profile').innerHTML = headTemplate(headData);

    document
        .getElementById('profileContainer')
        .insertAdjacentHTML('beforeend', infoTemplate(infoData));
    document
        .getElementById('profileContainer')
        .insertAdjacentHTML('beforeend', buttonsTemplate(buttonsData));

    if (!editMode) {
        document
            .getElementById('changeInfo')
            .onclick = changeInfo;

        document
            .getElementById('changePassword')
            .onclick = changePassword;
    } else {
        document
            .getElementById('saveChanges')
            .onclick = saveChanges;
    }
}

const changeInfo = (e) => {
    e.preventDefault();
    renderProfile(true);
}

const changePassword = (e) => {
    e.preventDefault();
    renderProfile(true, true);
}

const saveChanges = () => {
    renderProfile();
}

renderProfile();
