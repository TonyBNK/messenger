import {Block} from '../../common';
import {
    Message, IAltUrl, IInput, IAvatar, IButton,
} from '../../base';
import {render, renderList} from '../../../utils/main';
import {chatsTemplate} from '../../../templates/pages';
import {Chat, IForm} from '../../complex';

type ChatType = {
    avatar: IAvatar
    name: string
    lastMessage: string
    lastMessageTime: string
    unreadMessages: number
    selected?: boolean
    events?: {
        click?: () => void
    },
}

type MessageType = {
    className: string
    text: string
    time: string
}

type ChatsPropsType = {
    toProfile: IAltUrl
    chatListSearch: IInput
    chatList: Array<ChatType>
    penFriendAvatar: IAvatar
    penFriendName: string
    moreButton: IButton
    messagesDate: string
    messages: Array<MessageType>
    attachmentsButton: IButton
    form: IForm
    isChatSelected: boolean
}

export class Chats extends Block {
    constructor(props: ChatsPropsType) {
        super('div', props);
    }

    private renderMessages(chats: DocumentFragment) {
        this.props.messages.forEach((message: MessageType) => {
            render('.messages-container', new Message({
                ...message,
            }), chats);
        });
    }

    render() {
        const chats = this.compile(chatsTemplate, {
            toProfile: this.props.toProfile,
            chatListSearch: this.props.chatListSearch,
            chatList: this.props.chatList,
            penFriendAvatar: this.props.penFriendAvatar,
            penFriendName: this.props.penFriendName,
            moreButton: this.props.moreButton,
            messagesDate: this.props.messagesDate,
            messages: this.props.messages,
            attachmentsButton: this.props.attachmentsButton,
            form: this.props.form,
            isChatSelected: this.props.isChatSelected,
        });

        renderList(chats, '.chat-list-item-container', this.props.chatList, Chat);

        this.renderMessages(chats);

        return chats;
    }
}
