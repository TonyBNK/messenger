import {Block} from '../../common';
import {errorTemplate} from '../../../templates/pages';
import {IAltUrl} from '../../base';

type ErrorPropsType = {
    status: number
    description: string
    altUrl: IAltUrl
}

export class Error extends Block {
    constructor(props: ErrorPropsType) {
        super('div', props);
    }

    render() {
        return this.compile(errorTemplate, {
            status: this.props.status,
            description: this.props.description,
            altUrl: this.props.altUrl,
        });
    }
}
