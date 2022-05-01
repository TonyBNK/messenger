import {Block, IBlock} from '../components/common';
import {Constructable} from '../types';

export const render = (query: string, block: IBlock, docFrag?: DocumentFragment) => {
    const root = docFrag ? docFrag.querySelector(query) : document.querySelector(query);

    const content = block.getContent();

    if (root && content) {
        root.appendChild(content);
    }

    block.dispatchComponentDidMount();

    return root;
};

export const renderList = (
    fragment: DocumentFragment,
    query: string,
    items: Array<Record<string, any>>,
    Component: Constructable<Block>,
) => {
    const container = fragment.querySelector(query);

    const blocks = items.map((item) => new Component({
        ...item,
    }));

    if (container) {
        container.textContent = '';

        for (let i = 0; i < blocks.length; i++) {
            const content = blocks[i].getContent();

            if (content) {
                container.appendChild(content);
            }
        }
    }

    return container;
};
