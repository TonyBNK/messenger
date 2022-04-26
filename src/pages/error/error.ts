import {last} from '../../utils/mydash';
import {ErrorDataType, Status} from './types';
import {errorTemplate} from '../../templates/complex';

const searchParams = window.location.search.split('=')
    .map((param) => +param);

const statusCode: number = last(searchParams) ?? 404;

const data: ErrorDataType = {
    errorStatus: statusCode,
    errorDescription: statusCode === Status.NotFound ? 'Не туда попали' : 'Мы уже фиксим',
    altUrl: '../chats/chats.html',
    altUrlLabel: 'Назад к чатам',
};

const error = document.getElementById('error');

if (error) {
    error.innerHTML = errorTemplate(data);
}
