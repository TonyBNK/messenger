import {Router} from './src/utils/main';
import {
    Chats, Error, Login, Profile, Registration,
} from './src/components/pages';
import {profileProps} from './src/pages';
import {chatList} from './src/mocks';

const router = new Router('.app');

const {pathname} = window.location;

router
    .use('/login', Login)
    .use('/registration', Registration)
    .use('/chats', Chats, {chatList})
    .use('/profile', Profile, profileProps)
    .start();

if (!router.getRoute(pathname)) {
    router
        .use('/error', Error, {status: 404})
        .go('/error');
}

if (pathname.length === 1 && pathname[0] === '/') {
    router.go('/chats');
}

// @ts-ignore
window.router = router;
