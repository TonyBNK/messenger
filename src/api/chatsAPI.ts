import {yandexTransport} from '../utils/main';

type GetChatsDataType = {
    offset?: number
    limit?: number
    title?: string
}

type GetChatUsersDataType = Omit<GetChatsDataType, 'title'> & {
    name?: string
    email?: string
}

export const chatsAPI = {
    getChats: (data?: GetChatsDataType): Promise<any> => yandexTransport.get(
        '/chats',
        {
            withCredentials: true,
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
            },
            data,
        },
    ),
    getChatUsers: (id: number, data?: GetChatUsersDataType): Promise<any> => yandexTransport.get(
        `/chats/${id}/users`,
        {
            withCredentials: true,
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
            },
            data,
        },
    ),
    getChatToken: (id: number): Promise<any> => yandexTransport.post(
        `/chats/token/${id}`,
        {
            withCredentials: true,
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
            },
        },
    ),
    createChat: (data: string): Promise<any> => yandexTransport.post(
        '/chats',
        {
            withCredentials: true,
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
            },
            data,
        },
    ),
    addUserToChat: (data: string): Promise<any> => yandexTransport.put(
        '/chats/users',
        {
            withCredentials: true,
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
            },
            data,
        },
    ),
    deleteUserFromChat: (data: string): Promise<any> => yandexTransport.delete(
        '/chats/users',
        {
            withCredentials: true,
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
            },
            data,
        },
    ),
};
