import {Button} from './src/components/Button/Button';
import {render} from './src/utils/renderDom';
import {Profile} from './src/components/Button/Profile';

// const button = new Button({
//     className: 'main-button',
//     label: 'Click me',
//     events: {
//         click: (e: PointerEvent) => console.log(e),
//     },
//     settings: {withInternalID: true},
// });

const profile = new Profile({
    button: new Button({
        label: 'Confirm',
        className: 'main-button',
    }),
    userName: 'John Doe',
});

render('.app', profile);

// setTimeout(() => {
//     button.setProps({
//         label: 'Click me, please',
//     });
// }, 2000);
