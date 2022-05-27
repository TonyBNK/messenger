import {Block} from '../../common';
import {loginTemplate} from '../../../templates/pages';
import {IForm} from '../../complex';

type LoginPropsType = {
    title: string
    form: IForm
    attr?: {
        id?: string
        class?: string
    }
}

export class Login extends Block {
    constructor(props: LoginPropsType) {
        super('div', props);
    }

    componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>): boolean {
        return oldProps.title !== newProps.title;
    }

    render() {
        return this.compile(loginTemplate, {
            title: this.props.title,
            form: this.props.form,
        });
    }
}
