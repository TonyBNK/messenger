import {render} from './renderDom';
import {IBlock} from '../../components/common';
import {Constructable, Nullable} from '../../types';

function isEqual(lhs: string, rhs: string) {
    return lhs === rhs;
}

export class Route {
    _pathname: string;

    _blockClass: Constructable<IBlock>;

    _block: Nullable<IBlock>;

    _props: Record<string, any>;

    constructor(pathname: string, view: Constructable<IBlock>, props: Record<string, any>) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            // this._block.hide();
            this._block.remove();
            this._block = null;
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        const {
            rootQuery,
            ...restProps
        } = this._props;

        if (!this._block) {
            this._block = new this._blockClass({...restProps});
            render(rootQuery, this._block);
        }

        // this._block.show();
    }
}
