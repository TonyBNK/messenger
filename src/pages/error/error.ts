import {AltUrl} from '../../components/base';
import {Error} from '../../components/pages';
import {render} from '../../utils/main';

const messages = {
    404: 'Не туда попали',
    500: 'Мы уже фиксим',
};

const searchParams = new URLSearchParams(window.location.search);

const statusCode = searchParams.get('status');

if (statusCode) {
    const status = +statusCode;

    const altUrl = new AltUrl({
        href: '../chats/chats.html',
        label: 'Назад к чатам',
    });

    const error = new Error({
        status,
        description: messages[status as keyof typeof messages],
        altUrl,
    });

    render('#error-page', error);
}
