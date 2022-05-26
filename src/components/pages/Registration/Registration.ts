import {Block} from '../../common';
import {registrationTemplate} from '../../../templates/pages';
import {IForm} from '../../complex';

type RegistrationPropsType = {
    title: string
    form: IForm
    attr?: {
        id?: string
        class?: string
    }
}

export class Registration extends Block {
    constructor(props: RegistrationPropsType) {
        super('div', props);
    }

    render() {
        return this.compile(registrationTemplate, {
            title: this.props.title,
            form: this.props.form,
        });
    }
}
