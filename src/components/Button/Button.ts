import template from './button.hbs';
import {Block} from '../common/Block/Block';

export class Button extends Block {
    constructor(props: Record<string, any>) {
        // обернул кнопку (как строчный элемент) спаном
        super('span', props);
    }

    render() {
        const {
            label,
            className,
        } = this.props;

        return template({
            label,
            className,
        });
    }
}
