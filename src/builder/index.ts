import * as loader from './loader';
import { bindProperties } from './properties';
import { bindMethods } from './methods';
import { BuilderDependencies, dependencyFactory } from './dependencies';

export class Builder<T = {}> extends loader.AbstractBuilder<T> {
	constructor(name: string, deps?: Partial<BuilderDependencies>) {
		super(deps);
		bindProperties(this, name);
		bindMethods(this);
	}

	public get structure() {
		return this.data;
	}

	public parse = (): T => {
		return {} as any;
	};
}
