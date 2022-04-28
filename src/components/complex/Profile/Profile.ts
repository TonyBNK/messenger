import {Block} from '../../common';
import {profileTemplate} from '../../../templates/complex';
import {AltUrl, Input} from '../../base';
import {TextRow} from '../../base/TextRow/TextRow';
import {render} from '../../../utils/renderDom';
import {IAvatar} from '../../base/Avatar/Avatar';
import {IButton} from '../../base/Button/Button';

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

    private renderFields(profile: DocumentFragment) {
        const rows = profile.querySelectorAll('.list-item');

        rows.forEach((row, i) => {
            const block = this.props.editMode
                ? new Input({...this.props.fields[i]})
                : new TextRow({...this.props.fields[i]});

            const content = block.getContent();

            if (content) {
                row.appendChild(content);
            }

            block.dispatchComponentDidMount();
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

        this.renderFields(profile);

        return profile;
    }
}
