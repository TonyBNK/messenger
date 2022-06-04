// eslint-disable-next-line max-classes-per-file
import {expect} from 'chai';
import {Router} from './router';
import {Route} from './route';

describe('Router', () => {
    const router = new Router('some query');

    class MyBlock {
        getContent() {
            const div = document.createElement('div');

            div.id = 'test-div';

            return div;
        }

        dispatchComponentDidMount() {
        }
    }

    it('should be singleton', () => {
        expect(new Router('other query'))
            .to
            .eq(router);
    });

    describe('.use', () => {
        it('should return Router instance', () => {
            const result = router.use('/', class {
            } as any);

            expect(result)
                .to
                .instanceof(Router);
        });
    });

    describe('.go', () => {
        it('should change location pathname', () => {
            router.use('/page', MyBlock as any);

            router.go('/page');

            expect(window.location.pathname)
                .to
                .eq('/page');
        });
    });

    describe('.getRoute', () => {
        it('should return route object', () => {
            const route = router.getRoute('/page');

            expect(route)
                .to
                .instanceof(Route);
        });
    });
});
