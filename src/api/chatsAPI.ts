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
    getChats: (data?: GetChatsDataType): Promise<any> => yandexTransport.get('/chats', {data}),
    getChatUsers: (id: number, data?: GetChatUsersDataType): Promise<any> => yandexTransport.get(`/chats/${id}/users`, {data}),
    getChatToken: (id: number): Promise<any> => yandexTransport.post(
        `/chats/token/${id}`, {headers: {'content-type': 'application/json'}},
    ),
    createChat: (data: string): Promise<any> => yandexTransport.post('/chats', {data}),
    addUserToChat: (data: string): Promise<any> => yandexTransport.put('/chats/users', {data}),
    deleteUserFromChat: (data: string): Promise<any> => yandexTransport.delete('/chats/users', {data}),
};
