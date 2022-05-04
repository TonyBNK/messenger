import {Block} from '../../common';
import {loginTemplate} from '../../../templates/pages';
import {IForm} from '../../complex';

type LoginPropsType = {
    title: string
    form: IForm
}

export class Login extends Block {
    constructor(props: LoginPropsType) {
        super('div', props);
    }

    render() {
        return this.compile(loginTemplate, {
            title: this.props.title,
            form: this.props.form,
        });
    }
}
