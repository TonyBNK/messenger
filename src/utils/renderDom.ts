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
    const elements = fragment.querySelectorAll(query);

    elements.forEach((element, i) => {
        const block = new Component({
            ...items[i],
        });

        const content = block.getContent();

        if (content) {
            element.appendChild(content);
        }

        block.dispatchComponentDidMount();
    });
};
