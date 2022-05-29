import {altUrlTemplate} from '../../../templates/base';
import {Block, IBlock} from '../../common';

export type AltUrlType = {
    label?: string
    children?: IBlock
    events?: {
        click?: () => void
    }
    attr?: {
        id?: string
        class?: string
        href?: string
    }
}

export interface IAltUrl extends IBlock {
}

export class AltUrl extends Block {
    constructor(props: AltUrlType) {
        super('a', {
            ...props,
            attr: {
                ...props.attr,
                class: props.attr?.class ?? 'alt-url',
            },
        });
    }

    render() {
        return this.compile(altUrlTemplate, {
            label: this.props.label,
        });
    }
}
