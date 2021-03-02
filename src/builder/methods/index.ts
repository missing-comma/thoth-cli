import { Instance } from '../loader';
import { addError } from './add-error';
import { positional } from './positional';
import { flag } from './flag';
import { parse } from './parse';

export const methods = {
	addError,
	positional,
	flag,
	parse,
};

export const methodKeys = Object.keys(methods) as Array<keyof typeof methods>;

export const bindMethods = (ctx: Instance) => {
	methodKeys.forEach((key) => {
		const method: any = methods[key].bind(ctx);
		ctx[key] = method;
	});
};
