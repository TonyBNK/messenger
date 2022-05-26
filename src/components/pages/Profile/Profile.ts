import {Block} from '../../common';
import {IAvatar} from '../../base';
import {profileTemplate} from '../../../templates/pages';
import {IForm} from '../../complex';

type ProfilePropsType = {
    avatar: IAvatar
    name: string
    form: IForm
    editMode?: boolean
    attr?: {
        id?: string
        class?: string
    }
}

export class Profile extends Block {
    constructor(props: ProfilePropsType) {
        super('div', props);
    }

    render() {
        return this.compile(profileTemplate, {
            avatar: this.props.avatar,
            name: this.props.name,
            form: this.props.form,
            editMode: this.props.editMode,
        });
    }
}
