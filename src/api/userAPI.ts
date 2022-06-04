import {yandexTransport} from '../utils/main';

export const userAPI = {
    changeUserProfile: (data: string): Promise<any> => yandexTransport.put(
        '/user/profile',
        {
            withCredentials: true,
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
            },
            data,
        },
    ),
    changeUserPassword: (data: string): Promise<any> => yandexTransport.put(
        '/user/password',
        {
            withCredentials: true,
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
            },
            data,
        },
    ),
    changeUserAvatar: (form: FormData): Promise<any> => yandexTransport.put(
        '/user/profile/avatar',
        {
            withCredentials: true,
            mode: 'cors',
            data: form,
        },
    ),
    searchUserByLogin: (data: string): Promise<any> => yandexTransport.post(
        '/user/search',
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
