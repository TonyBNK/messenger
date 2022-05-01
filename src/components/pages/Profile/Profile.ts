import {Block} from '../../common';
import {AltUrl, IAvatar, IButton} from '../../base';
import {render} from '../../../utils/renderDom';
import {profileTemplate} from '../../../templates/pages';
import {IForm} from '../../complex';

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
    form: IForm
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
            form: this.props.form,
            links: this.props.links,
            button: this.props.button,
            editMode: this.props.editMode,
        });

        if (!this.props.editMode) {
            this.renderLinks(profile);
        }

        // renderList(profile, '.form-field-container', this.props.form.fields, this.props.editMode ? Input : TextRow);

        return profile;
    }
}
