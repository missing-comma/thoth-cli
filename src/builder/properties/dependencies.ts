import { Manager } from '~cli/protocols';

export type BuilderDependencies = Readonly<{
	manager: Manager;
}>;
