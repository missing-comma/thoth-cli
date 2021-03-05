import { Options, PositionalOptions } from 'yargs';
import { CmdOption } from '~cli/protocols/cmd-option';
import { DataEntry } from '~cli/types';
import { Dependencies, factoryDependencies } from './dependencies';

export class Option<Data extends DataEntry.Default> implements CmdOption<Data> {
	protected readonly deps: Dependencies;

	public readonly typeof: DataEntry.Primitive;

	constructor(public readonly data: Data, deps: Partial<Dependencies> = {}) {
		this.deps = factoryDependencies(deps);
		this.typeof = this.deps.typeGetter.get(data);
	}

	mapFlag = (): Options => {
		const type = this.typeof;
		return this.deps.commonOptionMapper.map<Options>(this.data, [
			(opt) => {
				opt[type] = true;
			},
		]);
	};
	mapPositional = (): PositionalOptions => {
		const type = this.typeof;
		return this.deps.commonOptionMapper.map<PositionalOptions>(this.data, [
			(opt) => {
				opt.type = type;
			},
		]);
	};
}
