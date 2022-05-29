import {Block} from '../../common';

export class Arrow extends Block {
    constructor(props: Record<string, any> = {}) {
        super('div', {
            ...props,
            attr: {
                ...props.attr,
                class: props.attr?.class ?? 'arrow',
            },
        });
    }

    render() {
        return this.compile(() => '', {});
    }
}
