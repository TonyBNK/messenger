import {last} from '../../utils/mydash';
import {AltUrl} from '../../components/base';
import {Error} from '../../components/pages';
import {render} from '../../utils/main';

enum Status {
    NotFound = 404,
    InternalSeverError = 500
}

const searchParams = window.location.search.split('=')
    .map((param) => +param);

const status: number = last(searchParams) ?? 404;

const altUrl = new AltUrl({
    href: '../chats/chats.html',
    label: 'Назад к чатам',
});

const error = new Error({
    status,
    description: status === Status.NotFound ? 'Не туда попали' : 'Мы уже фиксим',
    altUrl,
});

render('#error-page', error);
