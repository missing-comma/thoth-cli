import { Argv } from 'yargs';

export interface GetCommandLine {
	get: (depth: number, base?: string[]) => string[];
}

export interface CreateNewYargs {
	create: (cmd: string[]) => Argv;
}
