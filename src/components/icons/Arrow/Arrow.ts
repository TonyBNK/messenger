import {Block} from '../../common';

export class Arrow extends Block {
    constructor(props: Record<string, any> = {}) {
        super('div', props);
    }

    render() {
        return this.compile(() => '', {});
    }
}
