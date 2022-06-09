import {
    router,
    withActiveChat,
    withChats,
    withMessages,
    withSocket,
    withUser,
} from './src/utils/main';
import {
    Chats, Error, Login, Profile, Registration,
} from './src/components/pages';
import './src/styles/sass/root.scss';
import './src/templates/pages/login/login.scss';
import './src/templates/pages/registration/registration.scss';
import './src/templates/pages/profile/profile.scss';
import './src/templates/pages/error/error.scss';
import './src/templates/pages/chats/chats.scss';
import './src/templates/complex/form/form.scss';
import './src/templates/complex/chat/chat.scss';
import './src/templates/complex/modal/modal.scss';
import './src/templates/complex/popup/popup.scss';

const {pathname} = window.location;

router
    .use('/', withUser(Login))
    .use('/sign-up', Registration)
    .use('/messenger', withSocket(withMessages(withActiveChat(withUser(withChats(Chats))))))
    .use('/settings', withUser(Profile))
    .start();

if (!router.getRoute(pathname)) {
    router
        .use('/error', Error, {status: 404})
        .go('/error');
}
