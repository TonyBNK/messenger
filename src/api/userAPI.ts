import {yandexTransport} from '../utils/main';

export const userAPI = {
    changeUserProfile: (data: string): Promise<any> => yandexTransport.put('/user/profile', {data}),
    changeUserPassword: (data: string): Promise<any> => yandexTransport.put('/user/password', {data}),
    changeUserAvatar: (form: FormData): Promise<any> => yandexTransport.put('/user/profile/avatar', {
        headers: {},
        data: form,
    }),
    searchUserByLogin: (data: string): Promise<any> => yandexTransport.post('/user/search', {data}),
};
