import { DataEntry } from '~cli/types';
import { CommonOptionMapper, AnyOption, Transformations } from '../../protocols';

export class CommonOptionMapperAdapter implements CommonOptionMapper {
	public map = <Opt extends AnyOption>(data: DataEntry.Default, additional: Transformations<Opt> = []) => {
		const option: Opt = this.initialCommonOptions(data);
		const initialOptions = this.applyTransformations(option, this.getCommonTransformations(data));
		return this.applyTransformations(initialOptions, additional);
	};

	private initialCommonOptions = <Opt extends AnyOption>(data: DataEntry.Default): Opt => {
		const option: AnyOption = {
			alias: data.alias,
			description: data.description,
			demandOption: data.required,
			default: data.default,
		};
		return option as any;
	};

	private getCommonTransformations = (data: DataEntry.Default): Transformations<AnyOption> => {
		return [
			(opt) => {
				if (data.choices) {
					opt.choices = data.choices;
				}
			},
		];
	};

	private applyTransformations = <Opt extends AnyOption>(
		initial: AnyOption,
		transformations: Transformations<Opt>,
	): Opt => {
		return transformations.reduce((finalOption: Opt, transformation) => {
			return transformation(finalOption) || finalOption;
		}, initial as Opt);
	};
}
