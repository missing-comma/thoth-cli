import { GetCommandLineAdapter, CreateNewYargsAdapter } from './helpers';
import { GetCommandLine, CreateNewYargs } from './protocols';

export interface Dependencies {
	getCmdLine: GetCommandLine;
	newYargs: CreateNewYargs;
}

export const factoryDependencies = (deps: Partial<Dependencies> = {}): Dependencies => {
	const getCmdLine = deps.getCmdLine || new GetCommandLineAdapter();
	const newYargs = deps.newYargs || new CreateNewYargsAdapter();

	return {
		getCmdLine,
		newYargs,
	};
};
