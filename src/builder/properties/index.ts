import { Instance } from '../loader';

function initialValueSetter(this: Instance, name: string) {
	this.data = {
		name,
		flags: {},
		positionals: [],
	};
	this.yargModifiers = [];
	this.errors = [];
}

export function bindProperties(ctx: Instance, name: string) {
	initialValueSetter.bind(ctx)(name);
}
