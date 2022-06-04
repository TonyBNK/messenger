import {Block, IBlock} from '../../common';
import {avatarTemplate} from '../../../templates/base';

type AvatarPropsType = {
    attr?: {
        id?: string
        class?: string
        src?: string
        alt?: string
    }
    events?: {
        click?: () => void
        change?: (e: Event) => void
        submit?: (e: Event) => void
    }
}

export interface IAvatar extends IBlock {
}

export class Avatar extends Block {
    constructor(props: AvatarPropsType) {
        super('input', {
            ...props,
            attr: {
                ...props.attr,
                type: 'image',
            },
        });
    }

    private upload() {
        (this._element?.querySelector('#upload-my-avatar') as HTMLElement).click();
    }

    _addEvents() {
        const {events = {}} = this.props;

        Object
            .keys(events)
            .forEach((eventName) => {
                if (this._element) {
                    if (eventName === 'submit') {
                        const form = this._element.querySelector('#my-avatar-form');

                        if (form) {
                            form.addEventListener(eventName, events[eventName]);
                        }
                    }

                    if (eventName === 'change') {
                        const myAvatar = this._element?.querySelector('#my-avatar');

                        if (myAvatar) {
                            myAvatar.addEventListener(eventName, this.upload.bind(this));
                        }
                    }
                }
            });

        super._addEvents();
    }

    _deleteEvents() {
        const {events = {}} = this.props;

        Object
            .keys(events)
            .forEach((eventName) => {
                if (this._element) {
                    if (eventName === 'submit') {
                        const form = this._element.querySelector('#my-avatar-form');

                        if (form) {
                            form.removeEventListener(eventName, events[eventName]);
                        }
                    }

                    if (eventName === 'change') {
                        const myAvatar = this._element?.querySelector('#my-avatar');

                        if (myAvatar) {
                            myAvatar.removeEventListener(eventName, this.upload.bind(this));
                        }
                    }
                }
            });

        super._deleteEvents();
    }

    render() {
        return this.compile(avatarTemplate, {});
    }
}
