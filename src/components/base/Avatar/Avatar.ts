import {avatarTemplate} from '../../../templates/base';
import {Block, IBlock} from '../../common';

type AvatarPropsType = {
    image?: string
    id?: string
    className?: string
}

export interface IAvatar extends IBlock {
}

export class Avatar extends Block {
    constructor(props: AvatarPropsType) {
        super('div', props);
    }

    render() {
        return this.compile(avatarTemplate, {
            id: this.props.id,
            image: this.props.image,
            className: this.props.className,
        });
    }
}
