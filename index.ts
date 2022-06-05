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
