import { Instance } from '../../loader';

export function parse(this: Instance): any {
	return {};
}

export interface ParseFn<T> {
	(): T;
}
