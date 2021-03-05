import { YargsManagerAdapter } from '~cli/models/yargs-manager';
import { BuilderDependencies } from './properties/dependencies';

export * from './properties/dependencies';

export function dependencyFactory(dep: Partial<BuilderDependencies> = {}): BuilderDependencies {
	const manager = dep.manager || new YargsManagerAdapter();

	return {
		manager,
	};
}
