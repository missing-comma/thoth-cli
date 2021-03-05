import { Options, PositionalOptions } from 'yargs';
import { Flag, Positional } from '~cli/types';
import { OptionTypeGetter, CommonOptionMapper } from '../protocols';

export class OptionStaticMap {
	constructor(
		private readonly typeGetter: OptionTypeGetter,
		private readonly commonOptionMapper: CommonOptionMapper,
	) {}

	mapFlag = (data: Flag.Default): Options => {
		const type = this.typeGetter.get(data);
		return this.commonOptionMapper.map<Options>(data, [
			(opt) => {
				opt[type] = true;
			},
		]);
	};
	mapPositional = (data: Positional.Default): PositionalOptions => {
		const type = this.typeGetter.get(data);
		return this.commonOptionMapper.map<PositionalOptions>(data, [
			(opt) => {
				opt.type = type;
			},
		]);
	};
}
