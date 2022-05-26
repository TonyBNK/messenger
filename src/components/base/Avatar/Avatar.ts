import {Block, IBlock} from '../../common';
import {avatarTemplate} from '../../../templates/base';

type AvatarPropsType = {
    attr?: {
        id?: string
        class?: string
        src?: string
        alt?: string
    }
}

export interface IAvatar extends IBlock {
}

export class Avatar extends Block {
    constructor(props: AvatarPropsType) {
        super('img', props);
    }

    render() {
        return this.compile(avatarTemplate, {});
    }
}
