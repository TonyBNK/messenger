import {validateData} from '../handlers';
import {authAPI} from '../../api';
import store from '../main/store';
import {router} from '../main';

type SignUpDataType = {
    first_name: string
    second_name: string
    login: string
    email: string
    password: string
    phone: string
}

type SignInDataType = {
    login: string
    password: string
}

export const authController = {
    signUp: async (e: Event, regex: Record<string, any>) => {
        try {
            // Loading on
            const data = validateData(e, regex);

            if (data) {
                const xhr = await authAPI.signUp(JSON.stringify({...data as SignUpDataType}));

                if (xhr.status === 200) {
                    router.go('/');
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            // Loading off
        }
    },
    signIn: async (e: Event, regex: Record<string, any>) => {
        try {
            // Loading on
            const data = validateData(e, regex);

            if (data) {
                const xhr = await authAPI.signIn(JSON.stringify({...data as SignInDataType}));

                if (xhr.status === 200) {
                    router.go('/messenger');
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            // Loading off
        }
    },
    getUserInfo: async () => {
        try {
            // Loading on
            const xhr = await authAPI.getUserInfo();

            if (xhr.status === 200) {
                store.set('user', JSON.parse(xhr.response));
            }

            return;
        } catch (error) {
            console.log(error);
        } finally {
            // Loading off
        }
    },
    logOut: async () => {
        try {
            // Loading on
            const xhr = await authAPI.logOut();

            if (xhr.status === 200) {
                router.go('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            // Loading off
        }
    },
};
