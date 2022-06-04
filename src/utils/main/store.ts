import {EventBus} from './eventBus';
import {Nullable} from '../../types';
import {set} from '../mydash';
import {ChatItemType} from '../../components/complex';
import {MessageItemType} from '../../components/base';

export enum StoreEvents {
    Updated = 'updated',
}

export type RootStateType = {
    user: Nullable<{
        avatar: Nullable<string>
        display_name: Nullable<string>
        email: string
        first_name: string
        id: number
        login: string
        phone: string
        second_name: string
    }>
    chats: Array<ChatItemType>
    activeChat: Nullable<{
        id: number
        title: string
        token: string
        participants: Array<any>
    }>
    messages: Array<MessageItemType>
    socket: Nullable<WebSocket>
}

class Store extends EventBus {
    private state: RootStateType = {
        user: null,
        chats: [],
        activeChat: null,
        messages: [],
        socket: null,
    };

    public getState() {
        return this.state;
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);

        this.emit(StoreEvents.Updated);
    }
}

export default new Store();
