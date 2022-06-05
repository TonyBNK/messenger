import {yandexTransport} from '../utils/main';

export const authAPI = {
    signUp: (data: string): Promise<any> => yandexTransport.post('/auth/signup', {data}),
    signIn: (data: string): Promise<any> => yandexTransport.post('/auth/signin', {data}),
    getUserInfo: (): Promise<any> => yandexTransport.get('/auth/user'),
    logOut: (): Promise<any> => yandexTransport.post('/auth/logout'),
};
