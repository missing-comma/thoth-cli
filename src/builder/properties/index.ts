import { allInternalMiddlewaresKey } from '~cli/middlewares/internals';
import { Instance } from '../loader';

function initialValueSetter(this: Instance, name: string) {
	this.data = {
		name,
		flags: {},
		positionals: [],
	};
	this.yargModifiers = [];
	this.errors = [];
	this.middlewares = allInternalMiddlewaresKey;
}

export function bindProperties(ctx: Instance, name: string) {
	initialValueSetter.bind(ctx)(name);
}
