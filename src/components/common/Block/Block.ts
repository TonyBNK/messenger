import {EventBus, IObservable} from '../../../utils/eventBus';
import {Nullable} from '../../../types/types';

export interface IBlock {
    init(): void;

    getContent(): Nullable<HTMLElement>;

    dispatchComponentDidMount(): void;

    setProps(nextProps: Record<string, any>): void;

    render(): void;

    show(): void;

    hide(): void;
}

export class Block implements IBlock {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };

    _element: Nullable<HTMLElement> = null;

    _meta: Nullable<{ tagName: string, props: Record<string, unknown> }> = null;

    props;

    eventBus;

    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(tagName = 'div', props = {}) {
        const eventBus = new EventBus();

        this._meta = {
            tagName,
            props,
        };

        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT);
    }

    _makePropsProxy(props: Record<string, any>) {
        const self = this;

        return new Proxy(props, {
            get(target, prop) {
                let value;
                if (typeof prop === 'string') {
                    if (prop.indexOf('_') === 0) {
                        throw new Error('Нет прав');
                    }

                    value = target[prop];
                }
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop, value) {
                if (typeof prop === 'string') {
                    if (prop.indexOf('_') === 0) {
                        throw new Error('Нет прав');
                    }

                    target[prop] = value;
                }

                self.eventBus()
                    .emit(Block.EVENTS.FLOW_CDU, {...target}, {target});
                return true;
            },
            deleteProperty() {
                throw new Error('Нет прав');
            },
        });
    }

    _registerEvents(eventBus: IObservable) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    init() {
        this._createResources();
        this.eventBus()
            .emit(Block.EVENTS.FLOW_RENDER);
    }

    _createResources() {
        if (this._meta) {
            this._element = this._createDocumentElement(this._meta.tagName);
        }
    }

    _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }

    _render() {
        const block = this.render();

        this._deleteEvents();

        if (this._element) {
            this._element.innerHTML = `${block}`;
        }

        this._addEvents();
    }

    _deleteEvents() {
        const {events = {}} = this.props;

        Object.keys(events)
            .forEach((eventName) => {
                if (this._element) {
                    this._element.removeEventListener(eventName, events[eventName]);
                }
            });
    }

    _addEvents() {
        const {events = {}} = this.props;

        Object.keys(events)
            .forEach((eventName) => {
                if (this._element) {
                    this._element.addEventListener(eventName, events[eventName]);
                }
            });
    }

    getContent() {
        return this.element;
    }

    get element() {
        return this._element;
    }

    dispatchComponentDidMount() {
        this.eventBus()
            .emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidMount() {
        this.componentDidMount();
    }

    componentDidMount() {
    }

    setProps = (nextProps: Record<string, any>) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    _componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this._render();
        }
    }

    componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
        return oldProps !== newProps;
    }

    render() {
    }

    show() {
        const el = this.getContent();
        if (el) {
            el.style.display = 'block';
        }
    }

    hide() {
        const el = this.getContent();
        if (el) {
            el.style.display = 'none';
        }
    }
}
