import {altUrlTemplate} from '../../../templates/base';
import {Block} from '../../common';

export class AltUrl extends Block {
    constructor(props: Record<string, any>) {
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
