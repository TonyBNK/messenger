import {Block} from '../../common';
import {arrowTemplate} from '../../../templates/icons';

export class Arrow extends Block {
    constructor(props: Record<string, any> = {}) {
        super('span', props);
    }

    render() {
        return this.compile(arrowTemplate, {});
    }
}
