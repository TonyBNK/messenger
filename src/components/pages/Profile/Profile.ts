import {Block} from '../../common';
import {profileTemplate} from '../../../templates/pages';
import {Form} from '../../complex';
import {AltUrl, Avatar, Button} from '../../base';
import {FieldsBuilder, getUserAvatar} from '../../../utils/handlers';
import {infoFieldsFactory, passwordFieldsFactory} from '../../../mocks';
import {authController, userController} from '../../../utils/controllers';
import {isEqual} from '../../../utils/mydash';
import emptyAvatar from '../../../../static/images/emptyAvatar.png';
import store from '../../../utils/main/store';
import {regexRules, router} from '../../../utils/main';

type ProfilePropsType = {
    regex?: {
        first_name: string
        second_name: string
        display_name: string
        login: string
        oldPassword: string
        newPassword: string
        newPassword_again: string
        email: string
        phone: string
    }
    attr?: {
        id?: string
        class?: string
    }
}

export class Profile extends Block {
    constructor(props: ProfilePropsType) {
        const {attr} = props;

        const {
            first_name,
            second_name,
            display_name,
            login,
            oldPassword,
            newPassword,
            newPassword_again,
            email,
            phone,
        } = regexRules.rules;

        const regex = props.regex ?? {
            first_name,
            second_name,
            display_name,
            login,
            oldPassword,
            newPassword,
            newPassword_again,
            email,
            phone,
        };

        const infoRows = new FieldsBuilder(infoFieldsFactory())
            .withBlurHandler(regex)
            .withFocusHandler()
            .build();

        const passwordRows = new FieldsBuilder(passwordFieldsFactory())
            .withBlurHandler(regex)
            .withFocusHandler()
            .build();

        const toChats = new Button({
            label: '➜',
            attr: {
                class: 'to-chats',
            },
            events: {
                click: () => router.go('/messenger'),
            },
        });

        const button = new Button({
            label: 'Сохранить',
            attr: {
                type: 'submit',
            },
        });

        const altUrl = new AltUrl({
            label: 'Назад',
            events: {
                click: () => {
                    form.setProps({
                        readonly: true,
                        fields: this.props.infoRows ?? infoRows,
                    });
                },
            },
        });

        const links = [
            {
                label: 'Изменить данные',
                events: {
                    click: () => {
                        form.setProps({
                            readonly: false,
                        });
                    },
                },
            },
            {
                label: 'Изменить пароль',
                events: {
                    click: () => {
                        form.setProps({
                            readonly: false,
                            fields: this.props.passwordRows ?? passwordRows,
                        });
                    },
                },
            },
            {
                label: 'Выйти',
                events: {
                    click: () => authController.logOut(),
                },
            },
        ];

        const avatar = new Avatar({
            attr: {
                id: 'profilePhoto',
                class: 'profile-photo',
                src: store.getState().user?.avatar
                    ? getUserAvatar(store.getState().user?.avatar)
                    : emptyAvatar,
                alt: 'ава',
            },
            events: {
                click: () => {
                    if (this._element) {
                        (this._element.querySelector('#my-avatar') as HTMLElement).click();
                    }
                },
                change: () => {
                },
                submit: (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    return userController.changeUserAvatar(e);
                },
            },
        });

        const form = new Form({
            fields: infoRows,
            readonly: true,
            links,
            button,
            altUrl,
            events: {
                submit: (e: Event) => {
                    const fieldsContainer = (e.target as HTMLFormElement).querySelector('.fields-container');
                    return fieldsContainer!.children.length === 6
                        ? userController.changeUserProfile(e, regex)
                        : userController.changeUserPassword(e, regex);
                },
            },
            attr: {
                name: 'profile-form',
            },
        });

        super('div', {
            ...props,
            form,
            avatar,
            toChats,
            attr: {
                ...attr,
                class: attr?.class ?? 'profile-window',
            },
        });

        this.props.avatar = avatar;

        this.props.infoRows = infoRows;
        this.props.passwordRows = passwordRows;

        this.props.form = form;

        authController.getUserInfo();
    }

    componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>): boolean {
        if (oldProps.name !== newProps.name) return true;
        if (!oldProps.user || !newProps.user) return oldProps.user !== newProps.user;
        return !isEqual(oldProps.user, newProps.user);
    }

    render() {
        const {
            user,
            form,
            infoRows,
            passwordRows,
            avatar,
        } = this.props;

        if (user) {
            const src = user.avatar;

            if (src && avatar) {
                avatar.setProps({
                    attr: {
                        ...this.props.avatar.props.attr,
                        src: getUserAvatar(src),
                    },
                });
            }

            if (infoRows) {
                this.setProps({
                    infoRows: infoRows.map((row: any) => ({
                        ...row,
                        value: user[row.id.split('-')[1]],
                    })),
                });
            }

            if (passwordRows) {
                this.setProps({
                    passwordRows: passwordRows.map((row: any) => ({
                        ...row,
                        value: user[row.id.split('-')[1]],
                    })),
                });
            }
        }

        if (form) {
            this.props.form.setProps({
                fields: this.props.infoRows,
            });
        }

        return this.compile(profileTemplate, {
            name: user?.display_name ?? user?.first_name,
        });
    }
}
