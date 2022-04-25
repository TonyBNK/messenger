import {Button} from './src/components/Button/Button';
import {render} from './src/utils/renderDom';

const button = new Button({
    className: 'main-button',
    label: 'Click me',
    events: {
        click: (e: PointerEvent) => console.log(e),
    },
});

render('.app', button);

setTimeout(() => {
    button.setProps({
        label: 'Click me, please',
    });
}, 2000);
