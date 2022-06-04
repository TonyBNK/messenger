import {chatsAPI} from '../../api';
import store from '../main/store';
import {validateData} from '../handlers';
import {router} from '../main';
import {userController} from './userController';

type GetChatsDataType = {
    offset?: number
    limit?: number
    title?: string
}

type GetChatUsersDataType = Omit<GetChatsDataType, 'title'> & {
    name?: string
    email?: string
}

type CreateChatDataType = {
    title: string
}

type AddUserToChatData = {
    users: Array<number>
    chatId: number
}

type DeleteUserFromChatData = AddUserToChatData;

export const chatsController = {
    getChats: async (data?: GetChatsDataType) => {
        try {
            // Loading on
            const xhr = await chatsAPI.getChats(data);

            if (xhr.status === 200) {
                store.set('chats', JSON.parse(xhr.response));
            }
        } catch (error) {
            console.log(error);
        } finally {
            // Loading off
        }
    },
    getChatUsers: async (id: number, data?: GetChatUsersDataType) => {
        try {
            // Loading on
            const xhr = await chatsAPI.getChatUsers(id, data);

            if (xhr.status === 200) {
                return JSON.parse(xhr.response);
            }
        } catch (error) {
            console.log(error);
        } finally {
            // Loading off
        }
    },
    getChatToken: async (id: number) => {
        try {
            // Loading on
            const xhr = await chatsAPI.getChatToken(id);

            if (xhr.status === 200) {
                return JSON.parse(xhr.response).token;
            }
        } catch (error) {
            console.log(error);
        } finally {
            // Loading off
        }
    },
    createChat: async (e: Event, regex: Record<string, any>) => {
        try {
            // Loading on
            const data = validateData(e, regex);

            if (data) {
                const xhr = await chatsAPI.createChat(
                    JSON.stringify({...data as CreateChatDataType}),
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
    addUserToChat: async (e: Event, regex: Record<string, any>, chatId: number) => {
        try {
            // Loading on
            const user = await userController.searchUserByLogin(e, regex);

            if (user) {
                const data: AddUserToChatData = {
                    users: [user.id],
                    chatId,
                };

                const xhr = await chatsAPI.addUserToChat(
                    JSON.stringify({...data}),
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
    deleteUserFromChat: async (e: Event, regex: Record<string, any>, chatId: number) => {
        try {
            // Loading on
            const user = await userController.searchUserByLogin(e, regex);

            if (user) {
                const data: DeleteUserFromChatData = {
                    users: [user.id],
                    chatId,
                };

                const xhr = await chatsAPI.deleteUserFromChat(
                    JSON.stringify({...data}),
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
    sendMessage: async (e: Event, regex: Record<string, any>, socket: WebSocket) => {
        try {
            // Loading on
            const data = validateData(e, regex);

            if (data) {
                socket.send(JSON.stringify({
                    content: `${data.message}`,
                    type: 'message',
                }));
                // console.log('Добавить отправку сообщения');
            }
        } catch (error) {
            console.log(error);
        } finally {
            // Loading off
        }
    },
};
