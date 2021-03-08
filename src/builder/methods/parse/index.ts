import { pipe } from 'ramda';
import { argv } from 'yargs';
import { parseMiddlewares } from '~cli/middlewares';
import { Yargs } from '~cli/protocols/yargs';
import { Format } from '~cli/services/format';
import { Instance } from '../../loader';

function applyMiddlewares(this: Instance, yargs: Yargs): Yargs {
	const middleware = parseMiddlewares(this.middlewares);
	return middleware({ data: this.data }).handler(yargs);
}

function applyModifiers(this: Instance, yargs: Yargs): Yargs {
	return this.yargModifiers.reduce((y, yargModifier) => yargModifier(y), yargs);
}

function applyInitial(this: Instance, yargs: Yargs): Yargs {
	const parsedPositionals = this.data.positionals
		.map((d) => {
			return (d.required ? Format.dotProd : Format.brackets)(d.key);
		})
		.join(' ');
	return yargs.modify((y) => y.command(`$0 ${this.data.name} ${parsedPositionals}`, false));
}

export function parse(this: Instance, cmdLine?: string[], parent?: Yargs): any {
	if (this.errors.length > 0) {
		throw this.errors.map((err) => `[ ${err.name} ]: ${err.description}`).join('\n');
	}

	const Manager = this.deps.manager;

	const initialYargs = Manager.new(cmdLine, parent);
	const yargs = pipe(applyInitial.bind(this), applyModifiers.bind(this), applyMiddlewares.bind(this))(initialYargs);

	return yargs.yargs.parse();
}

type Parse = typeof parse;
export type ParseFn<T> = (...args: Parameters<Parse>) => T;
