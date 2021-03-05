import { Yargs } from './yargs';

export interface Manager {
	new: (base?: string[], parent?: Yargs) => Yargs;
}
