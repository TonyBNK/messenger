import {Nullable} from '../../types';

const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

type OptionsType = {
    data?: Nullable<Document | XMLHttpRequestBodyInit | Record<string, unknown>>
    headers?: Record<string, string>
    timeout?: number
    method?: string
    withCredentials?: boolean
    mode?: string
};

type MethodType = (url: string, options?: OptionsType) => Promise<unknown>;

type RequestType = (url: string, options: OptionsType, timeout?: number) => Promise<unknown>;

const queryStringify = (
    data?: Nullable<Document | XMLHttpRequestBodyInit | Record<string, unknown>>,
): string => {
    if (!data) {
        return '';
    }

    const params = Object.entries(data);

    return params.reduce((queryString, [key, value], i) => queryString.concat(`${key}=${value}${i === params.length - 1 ? '' : '&'}`), '?');
};

class HTTPTransport {
    host: string;

    constructor(host: string) {
        this.host = host;
    }

    get: MethodType = (url, options = {}) => this.request(
        url.concat(queryStringify(options.data)),
        {
            ...options,
            method: METHODS.GET,
        },
        options.timeout,
    );

    post: MethodType = (url, options = {}) => this.request(
        url,
        {
            ...options,
            method: METHODS.POST,
        },
        options.timeout,
    );

    put: MethodType = (url, options = {}) => this.request(
        url,
        {
            ...options,
            method: METHODS.PUT,
        },
        options.timeout,
    );

    delete: MethodType = (url, options = {}) => this.request(
        url,
        {
            ...options,
            method: METHODS.DELETE,
        },
        options.timeout,
    );

    request: RequestType = (url, options, timeout = 5000) => {
        const {
            method,
            data,
            headers = (options.data) ? {'content-type': 'application/json'} : {},
            withCredentials = true,
        } = options;

        const headerSettings = Object.entries(headers);

        return new Promise((resolve, reject) => {
            if (!method) {
                reject(Error('No method'));
            } else {
                const xhr = new XMLHttpRequest();

                xhr.open(method, this.host.concat(url));

                xhr.withCredentials = withCredentials;

                for (let i = 0; i < headerSettings.length; i++) {
                    xhr.setRequestHeader(`${headerSettings[i][0]}`, `${headerSettings[i][1]}`);
                }

                xhr.onload = () => {
                    resolve(xhr);
                };

                xhr.onabort = reject;
                xhr.onerror = reject;

                xhr.timeout = timeout;
                xhr.ontimeout = reject;

                if (method === METHODS.GET || !data) {
                    xhr.send();
                } else {
                    xhr.send(data as XMLHttpRequestBodyInit);
                }
            }
        });
    };
}

export const yandexTransport = new HTTPTransport('https://ya-praktikum.tech/api/v2');
