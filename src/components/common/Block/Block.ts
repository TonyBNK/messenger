import {v4 as makeUUID} from 'uuid';
import {EventBus, IObservable} from '../../../utils/eventBus';
import {Nullable} from '../../../types';

export interface IBlock {
    init(): void;

    getContent(): Nullable<HTMLElement>;

    dispatchComponentDidMount(): void;

    setProps(nextProps: Record<string, any>): void;

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

    _meta: Nullable<{ tagName: string, props: Record<string, any> }> = null;

    _id: string;

    props;

    eventBus;

    children;

    /** JSDoc
     * @param {string} tagName
     * @param {Object} propsAndChildren
     *
     * @returns {void}
     */
    constructor(tagName = 'div', propsAndChildren = {}) {
        const eventBus = new EventBus();

        const {
            children,
            props,
        } = this._getChildren(propsAndChildren);

        this.children = children;

        this._meta = {
            tagName,
            props,
        };

        this._id = makeUUID();

        this.props = this._makePropsProxy({
            ...props,
            __id: this._id,
        });

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT);
    }

    _getChildren(propsAndChildren: Record<string, any>) {
        const children: Record<string, any> = {};
        const props: Record<string, any> = {};

        Object.entries(propsAndChildren)
            .forEach(([key, value]) => {
                if (value instanceof Block) {
                    children[key] = value;
                } else {
                    props[key] = value;
                }
            });

        return {
            children,
            props,
        };
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

    compile(template: Function, props: Record<string, any>) {
        const propsAndStubs = {...props};

        Object.entries(this.children)
            .forEach(([key, child]) => {
                propsAndStubs[key] = `<div data-id='${child._id}'></div>`;
            });

        const fragment = document.createElement('template');

        fragment.innerHTML = template(propsAndStubs);

        Object.values(this.children)
            .forEach((child) => {
                const stub = fragment.content.querySelector(`[data-id='${child._id}']`);

                if (stub) {
                    stub.replaceWith(child.getContent());
                }
            });

        return fragment.content;
    }

    _createResources() {
        if (this._meta) {
            this._element = this._createDocumentElement(this._meta.tagName);
        }
    }

    _createDocumentElement(tagName: string) {
        const element = document.createElement(tagName);

        if (this.props?.settings?.withInternalID) {
            element.setAttribute('data-id', this._id);
        }

        return element;
    }

    _render() {
        const block = this.render();

        this._deleteEvents();

        if (this._element) {
            this._element.innerHTML = '';

            // @ts-ignore
            this._element.appendChild(block);
        }

        this._addEvents();
    }

    _deleteEvents() {
        const {events = {}} = this.props;

        Object.keys(events)
            .forEach((eventName) => {
                if (this._element) {
                    if (eventName === 'focus' || eventName === 'blur') {
                        const {children} = this._element;

                        for (let i = 0; i < children.length; i++) {
                            if (children[i].tagName === 'INPUT') {
                                children[i].removeEventListener(eventName, events[eventName]);
                            }
                        }
                    } else {
                        this._element.removeEventListener(eventName, events[eventName]);
                    }
                }
            });
    }

    _addEvents() {
        const {events = {}} = this.props;

        Object.keys(events)
            .forEach((eventName) => {
                if (this._element) {
                    if (eventName === 'focus' || eventName === 'blur') {
                        const {children} = this._element;

                        for (let i = 0; i < children.length; i++) {
                            if (children[i].tagName === 'INPUT') {
                                children[i].addEventListener(eventName, events[eventName]);
                            }
                        }
                    } else {
                        this._element.addEventListener(eventName, events[eventName]);
                    }
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

        Object.values(this.children)
            .forEach((child) => {
                child.dispatchComponentDidMount();
            });
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
