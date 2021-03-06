import {Route} from './route';
import {IBlock} from '../../components/common';
import {Constructable} from '../../types';

export class Router {
    static __instance: any;

    location: any;

    routes: any;

    history: any;

    _currentRoute: any;

    _rootQuery: any;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this.location = window.location;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    public use(pathname: string, block: Constructable<IBlock>, props: Record<string, any> = {}) {
        const route = new Route(pathname, block, {
            ...props,
            rootQuery: this._rootQuery,
        });

        this.routes.push(route);

        return this;
    }

    public start() {
        window.onpopstate = (event) => {
            const element = event.currentTarget as Window;
            this._onRoute(element.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    public go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    public back() {
        this.history.back();
    }

    public forward() {
        this.history.forward();
    }

    public getRoute(pathname: string) {
        return this.routes.find((route: Route) => route.match(pathname));
    }

    public refresh() {
        this.location.reload();
    }

    private _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render(route, pathname);
    }
}

export const router = new Router('.app');
