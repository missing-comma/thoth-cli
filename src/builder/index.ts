import * as loader from './loader';
import { bindProperties } from './properties';
import { bindMethods } from './methods';

export class Builder<T = {}> extends loader.AbstractBuilder<T> {
	constructor() {
		super();
		bindProperties(this);
		bindMethods(this);
	}

	public get structure() {
		return this.data;
	}

	public parse = (): T => {
		return {} as any;
	};
}
