import {altUrlTemplate} from '../../../templates/base';
import {Block} from '../../common';
import {IBlock} from '../../common/Block/Block';

type AltUrlPropsType = {
    href: string
    label: string
    id?: string
    className?: string
}

export interface IAltUrl extends IBlock {
}

export class AltUrl extends Block {
    constructor(props: AltUrlPropsType) {
        super('span', props);
    }

    render() {
        return this.compile(altUrlTemplate, {
            href: this.props.href,
            className: this.props.className,
            label: this.props.label,
        });
    }
}
