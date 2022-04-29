import {Block} from '../../common';
import {moreTemplate} from '../../../templates/icons';

export class More extends Block {
    constructor(props: any) {
        super('div', props);
    }

    render() {
        return this.compile(moreTemplate, {
            className: this.props.className,
        });
    }
}
