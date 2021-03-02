import { Instance } from '../loader';

function initialValueSetter(this: Instance): void {
	this.data = {
		flags: {},
		positionals: [],
	};
	this.errors = [];
}

export function bindProperties(ctx: Instance) {
	initialValueSetter.bind(ctx)();
}
