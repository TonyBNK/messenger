import template from './button.hbs';
import {Block} from '../common/Block/Block';

export class Button extends Block {
    constructor(props: Record<string, any>) {
        super('span', props);
    }

    render() {
        return this.compile(template, {
            label: this.props.label,
            className: this.props.className,
        });
    }
}
