import {altUrlTemplate} from '../../../templates/base';
import {Block, IBlock} from '../../common';

type AltUrlPropsType = {
    href: string
    label: string
    id?: string
    className?: string
    children?: IBlock
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
            label: this.props.label,
            id: this.props.id,
            className: this.props.className,
            children: this.props.children,
        });
    }
}
