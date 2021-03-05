import { Yargs } from '~cli/protocols/yargs';
import { Instance } from '../../loader';

export function parse(this: Instance, cmdLine?: string[], parent?: Yargs): any {
	if (this.errors.length > 0) {
		throw this.errors.map((err) => `[ ${err.name} ]: ${err.description}`).join('\n');
	}

	const Manager = this.deps.manager;

	let yargs = Manager.new(cmdLine, parent);

	yargs = this.yargModifiers.reduce((y, yargModifier) => yargModifier(y), yargs);

	return yargs.yargs.argv;
}

type Parse = typeof parse;
export type ParseFn<T> = (...args: Parameters<Parse>) => T;
