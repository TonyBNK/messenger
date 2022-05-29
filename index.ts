import {Router} from './src/utils/main';
import {
    Chats, Error, Login, Profile, Registration,
} from './src/components/pages';
import {profileProps} from './src/pages';
import {chatList} from './src/mocks';

const router = new Router('.app');

const {pathname} = window.location;

router
    .use('/', Login)
    .use('/sign-up', Registration)
    .use('/messenger', Chats, {chatList})
    .use('/settings', Profile, profileProps)
    .start();

if (!router.getRoute(pathname)) {
    router
        .use('/error', Error, {status: 404})
        .go('/error');
}

// @ts-ignore
window.router = router;
