import {validateData} from '../handlers';
import {userAPI} from '../../api';
import {router} from '../main';

type ChangeUserProfileDataType = {
    first_name: string
    second_name: string
    display_name: string
    login: string
    email: string
    phone: string
}

type ChangeUserPasswordDataType = {
    oldPassword: string
    newPassword: string
}

export const userController = {
    changeUserProfile: async (e: Event, regex: Record<string, any>) => {
        try {
            // Loading on
            const data = validateData(e, regex);

            if (data) {
                const xhr = await userAPI.changeUserProfile(
                    JSON.stringify({...data as ChangeUserProfileDataType}),
                );

                if (xhr.status === 200) {
                    router.refresh();
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            // Loading off
        }
    },
    changeUserPassword: async (e: Event, regex: Record<string, any>) => {
        try {
            // Loading on
            const data = validateData(e, regex);

            if (data) {
                const xhr = await userAPI.changeUserPassword(
                    JSON.stringify({...data as ChangeUserPasswordDataType}),
                );

                if (xhr.status === 200) {
                    router.refresh();
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            // Loading off
        }
    },
    changeUserAvatar: async (e: Event) => {
        try {
            // Loading on
            const form = new FormData(e.target as HTMLFormElement);

            const xhr = await userAPI.changeUserAvatar(form);

            if (xhr.status === 200) {
                router.refresh();
            }
        } catch (error) {
            console.log(error);
        } finally {
            // Loading off
        }
    },
    searchUserByLogin: async (e: Event, regex: Record<string, any>) => {
        try {
            // Loading on
            const data = validateData(e, regex);

            if (data) {
                const xhr = await userAPI.searchUserByLogin(
                    JSON.stringify({login: Object.values(data)[0]}),
                );

                if (xhr.status === 200) {
                    return JSON.parse(xhr.response)[0];
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            // Loading off
        }
    },
};
