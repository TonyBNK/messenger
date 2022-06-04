import store from '../../main/store';
import {getHoursMinutes} from './getHoursMinutes';
import {isPlainObject} from '../../mydash';

export class SocketBuilder {
    socket: WebSocket;

    constructor(userId: number, chatId: number, token: string) {
        this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
    }

    addOpenEvent(
        cb = () => {
            console.log('Соединение установлено');

            this.socket.send(JSON.stringify({
                content: '0',
                type: 'get old',
            }));
        },
    ) {
        this.socket.onopen = cb;
        return this;
    }

    addCloseEvent(
        cb = (event: CloseEvent) => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }

            console.log(`Код: ${(event as CloseEvent).code} | Причина: ${event.reason}`);
        },
    ) {
        this.socket.onclose = cb;
        return this;
    }

    addMessageEvent(
        cb = (event: MessageEvent) => {
            const data = JSON.parse(event.data);

            if (isPlainObject(data)) {
                store.set('messages', [...store.getState().messages, {
                    ...data,
                    date: new Date(data.time as string).toLocaleDateString(),
                    time: getHoursMinutes(new Date(data.time as string)),
                }]);
            }

            if (Array.isArray(data)) {
                const messages = data.map((message: any) => ({
                    ...message,
                    date: new Date(message.time).toLocaleDateString(),
                    time: getHoursMinutes(new Date(message.time)),
                }))
                    .reverse();

                store.set('messages', messages);
            }
        },
    ) {
        this.socket.onmessage = cb;
        return this;
    }

    addErrorEvent(
        cb = (event: Event) => {
            console.log('Ошибка', (event as ErrorEvent).message);
        },
    ) {
        this.socket.onerror = cb;
        return this;
    }

    build = () => this.socket;
}
