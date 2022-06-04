import {Block} from '../../components/common';
import store, {RootStateType, StoreEvents} from './store';
import {Constructable} from '../../types';
import {isEqual} from '../mydash';

type Indexed<T = any> = {
    [key in string]: T;
};

function connect(mapStateToProps: (state: RootStateType) => Indexed) {
    return (Component: Constructable<Block>) => class extends Component {
        constructor(props: Record<string, unknown>) {
            let state = mapStateToProps(store.getState());

            super({...props, ...state});

            store.on(StoreEvents.Updated, () => {
                const newState = mapStateToProps(store.getState());

                if (!isEqual(state, newState)) {
                    this.setProps({...newState});
                }

                state = newState;
            });
        }
    };
}

export const withUser = connect((state) => ({user: state.user}));
export const withChats = connect((state) => ({chats: state.chats}));
export const withActiveChat = connect((state) => ({activeChat: state.activeChat}));
export const withMessages = connect((state) => ({messages: state.messages}));
export const withSocket = connect((state) => ({socket: state.socket}));
