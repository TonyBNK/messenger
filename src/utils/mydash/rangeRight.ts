import range from './range';

function rangeRight(start: number, end?: number, step?: number): Array<number> {
    return range(start, end, step, true);
}

export default rangeRight;
