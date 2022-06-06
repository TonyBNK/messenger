import {Block} from '../../common';
import {popupTemplate} from '../../../templates/complex';
import {AltUrl, AltUrlType} from '../../base';
import {render} from '../../../utils/main';

type PopupPropsType = {
    links?: Array<AltUrlType>
    attr?: {
        id?: string
        class?: string
    }
}

export class Popup extends Block {
    private _isOpen: boolean;

    constructor(props: PopupPropsType) {
        super('div', {
            ...props,
            attr: {
                ...props.attr,
                class: 'popup-window',
            },
        });

        this._isOpen = false;
    }

    private renderLinks(popup: DocumentFragment) {
        this.props.links.forEach((link: AltUrlType) => {
            render('.popup-container', new AltUrl({
                ...link,
                attr: {
                    ...link.attr,
                    class: 'alt-url',
                },
            }), popup);
        });
    }

    get isOpen() {
        return this._isOpen;
    }

    open(e: Event) {
        e.stopPropagation();

        if (this._element) {
            const popup = this._element.querySelector('.popup-container');

            if (popup) {
                (popup as HTMLElement).style.visibility = 'visible';
                (e.target as HTMLElement).classList.toggle('clicked');
                this._isOpen = true;
            }
        }
    }

    close(e: Event) {
        e.stopImmediatePropagation();

        if (this._element) {
            const popup = this._element.querySelector('.popup-container');

            if (popup) {
                (popup as HTMLElement).style.visibility = 'hidden';
                (e.target as HTMLElement).classList.toggle('clicked');
                this._isOpen = false;
            }
        }
    }

    render() {
        const popup = this.compile(popupTemplate, {
            links: this.props.links,
        });

        this.renderLinks(popup);

        return popup;
    }
}
