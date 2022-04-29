import {Block} from '../../common';
import {profileTemplate} from '../../../templates/complex';
import {
    AltUrl, IAvatar, IButton, Input, TextRow,
} from '../../base';
import {render, renderList} from '../../../utils/renderDom';

type FieldType = {
    label: string
    name: string
    value?: string
    type?: string
    autofocus?: boolean
}

type LinkType = {
    href: string
    label: string
    id?: string
    events?: {
        click?: () => void
    }
}

type ProfilePropsType = {
    avatar: IAvatar
    name: string
    fields: Array<FieldType>
    links: Array<LinkType>
    button: IButton
    editMode?: boolean
}

export class Profile extends Block {
    constructor(props: ProfilePropsType) {
        super('div', props);
    }

    private renderLinks(profile: DocumentFragment) {
        this.props.links.forEach((link: LinkType) => {
            render('.button-container', new AltUrl({
                ...link,
                className: 'alt-url',
            }), profile);
        });
    }

    render() {
        const profile = this.compile(profileTemplate, {
            avatar: this.props.avatar,
            name: this.props.name,
            fields: this.props.fields,
            links: this.props.links,
            button: this.props.button,
            editMode: this.props.editMode,
        });

        if (!this.props.editMode) {
            this.renderLinks(profile);
        }

        renderList(profile, '.list-item', this.props.fields, this.props.editMode ? Input : TextRow);

        return profile;
    }
}
