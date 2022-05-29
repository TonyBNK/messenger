import {Block} from '../../common';
import {errorTemplate} from '../../../templates/pages';
import {AltUrl} from '../../base';

type ErrorPropsType = {
    status: number
    attr?: {
        id?: string
        class?: string
    }
}

export class Error extends Block {
    static codes: Record<number, string> = {
        404: 'Не туда попали',
        500: 'Мы уже фиксим',
    };

    constructor(props: ErrorPropsType) {
        const {
            attr,
        } = props;

        const altUrl = new AltUrl({
            label: 'Назад к чатам',
            events: {
                click: () => window.router.go('/messenger'),
            },
        });

        super('div', {
            ...props,
            altUrl,
            attr: {
                ...attr,
                class: attr?.class ?? 'error-window',
            },
        });
    }

    componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>): boolean {
        return oldProps.status !== newProps.status;
    }

    render() {
        return this.compile(errorTemplate, {
            status: this.props.status,
            description: Error.codes[this.props.status],
        });
    }
}
