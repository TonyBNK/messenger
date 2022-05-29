declare module '*.jpg' {
    export default '' as string;
}

declare module '*.png' {
    export default '' as string;
}

declare module '*.hbs' {
    export default function template(data?: unknown): string;
}
