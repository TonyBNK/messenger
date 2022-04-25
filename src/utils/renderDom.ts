import {IBlock} from '../components/common/Block/Block';

export const render = (query: string, block: IBlock) => {
    const root = document.querySelector(query);

    const content = block.getContent();

    if (root && content) {
        root.appendChild(content);
    }

    block.dispatchComponentDidMount();

    return root;
};
