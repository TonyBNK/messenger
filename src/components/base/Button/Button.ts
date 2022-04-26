import {Block} from '../../common';
import {buttonTemplate} from '../../../templates/base';

export class Button extends Block {
    constructor(props: Record<string, any>) {
        super('span', props);
    }

    render() {
        return this.compile(buttonTemplate, {
            id: this.props.id,
            type: this.props.type,
            className: this.props.className,
            label: this.props.label,
        });
    }
}
