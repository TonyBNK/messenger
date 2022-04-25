import template from './profile.hbs';
import {Block} from '../common/Block/Block';

export class Profile extends Block {
    constructor(props: Record<string, any>) {
        super('div', props);
    }

    render() {
        return this.compile(template, {
            userName: this.props.userName,
            button: this.props.button,
        });
    }
}
