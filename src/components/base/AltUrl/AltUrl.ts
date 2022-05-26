import {altUrlTemplate} from '../../../templates/base';
import {Block, IBlock} from '../../common';

export type AltUrlPropsType = {
    label: string
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
    constructor(props: AltUrlPropsType) {
        super('a', props);
    }

    render() {
        return this.compile(altUrlTemplate, {
            label: this.props.label,
            children: this.props.children,
        });
    }
}
