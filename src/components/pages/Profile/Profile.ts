import {Block} from '../../common';
import {profileTemplate} from '../../../templates/pages';
import {Form} from '../../complex';
import {AltUrl, Avatar, Button} from '../../base';
import {FieldsBuilder, handleSubmit} from '../../../utils/handlers';
import {infoFieldsFactory, passwordFieldsFactory} from '../../../mocks';

type ProfilePropsType = {
    avatar: string
    name: string

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
        const {
            avatar,
            attr,
        } = props;

        const regex = props.regex ?? {
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

        const infoRows = new FieldsBuilder(infoFieldsFactory())
            .withBlurHandler(regex)
            .withFocusHandler()
            .build();

        const passwordRows = new FieldsBuilder(passwordFieldsFactory())
            .withBlurHandler(regex)
            .withFocusHandler()
            .build();

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
                        fields: infoRows,
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
                            fields: passwordRows,
                        });
                    },
                },
            },
            {
                label: 'Выйти',
                events: {
                    click: () => window.router.go('/'),
                },
            },
        ];

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
                name: 'profile-form',
            },
        });

        super('div', {
            ...props,
            form,
            avatar: new Avatar({
                attr: {
                    id: 'profilePhoto',
                    class: 'profile-photo',
                    src: avatar,
                    alt: 'ава',
                },
            }),
            attr: {
                ...attr,
                class: attr?.class ?? 'profile-window',
            },
        });
    }

    componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>): boolean {
        return oldProps.name !== newProps.name;
    }

    render() {
        return this.compile(profileTemplate, {
            name: this.props.name,
        });
    }
}
