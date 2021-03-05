import { Argv } from 'yargs';
import { Flag, Positional } from '~cli/types';

export interface Yargs<T = {}> {
	readonly yargs: Argv<T>;

	readonly depth: number;
	readonly cmd: string[];

	option: (opt: Flag.Default) => Yargs<T>;
	positional: (opt: Positional.Default) => Yargs<T>;

	modify: (cb: (y: Argv<any>) => Argv<any>) => Yargs<T>;
}

export namespace Yargs {
	export type Modifier<T = {}, U = T> = (yargs: Yargs<T>) => Yargs<U>;
}
