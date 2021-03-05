import { Dependencies, factoryDependencies } from './dependencies';
import { YargsAdapter } from '../yargs-adapter';
import { Manager } from '~cli/protocols/manager';
import { Yargs } from '~cli/protocols';

export class YargsManagerAdapter implements Manager {
	private readonly deps: Dependencies;

	constructor(deps?: Partial<Dependencies>) {
		this.deps = factoryDependencies(deps);
	}

	public new = (base?: string[], parent?: Yargs): Yargs => {
		const parentDepth = parent?.depth ?? -1;
		const depth = parentDepth + 1;
		const cmd = this.deps.getCmdLine.get(depth, base);

		const yargInstance = this.deps.newYargs.create(cmd);

		return new YargsAdapter(depth, cmd, yargInstance);
	};
}
