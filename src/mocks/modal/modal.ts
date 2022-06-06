import {FieldType} from '../../components/complex';

type AddChatFieldFactoryType = (
    data?: {
        addChatLabel?: string
    }
) => Array<FieldType>;

type AddUserFieldFactoryType = (
    data?: {
        addUserLabel?: string
    }
) => Array<FieldType>;

type DeleteUserFieldFactoryType = (
    data?: {
        deleteUserLabel?: string
    }
) => Array<FieldType>;

export const addChatFieldFactory: AddChatFieldFactoryType = (data) => [
    {
        id: 'modal-add_chat_title',
        name: 'add_chat_title',
        label: data?.addChatLabel ?? 'Введите название чата:',
        type: 'text',
    },
];

export const addUserFieldFactory: AddUserFieldFactoryType = (data) => [
    {
        id: 'modal-add_user_login',
        name: 'add_user_login',
        label: data?.addUserLabel ?? 'Логин:',
        type: 'text',
    },
];

export const deleteUserFieldFactory: DeleteUserFieldFactoryType = (data) => [
    {
        id: 'modal-delete_user_login',
        name: 'delete_user_login',
        label: data?.deleteUserLabel ?? 'Логин:',
        type: 'text',
    },
];
