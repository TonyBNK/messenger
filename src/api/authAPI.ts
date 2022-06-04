import {yandexTransport} from '../utils/main';

export const authAPI = {
    signUp: (data: string): Promise<any> => yandexTransport.post(
        '/auth/signup',
        {
            withCredentials: true,
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
            },
            data,
        },
    ),
    signIn: (data: string): Promise<any> => yandexTransport.post(
        '/auth/signin',
        {
            withCredentials: true,
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
            },
            data,
        },
    ),
    getUserInfo: (): Promise<any> => yandexTransport.get(
        '/auth/user',
        {
            withCredentials: true,
            mode: 'cors',
        },
    ),
    logOut: (): Promise<any> => yandexTransport.post(
        '/auth/logout',
        {
            withCredentials: true,
            mode: 'cors',
        },
    ),
};
