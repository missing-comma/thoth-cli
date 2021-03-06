import { BuilderData } from '~cli/types';
import { flatten } from 'ramda';
import { Format } from '~cli/services/format';
import { PrettyOption } from './pretty-option';
import { ColorizedHelp } from './protocol';

export class ColorizedHelpAdapter implements ColorizedHelp {
	constructor(private readonly data: BuilderData) {}

	parse = (): string => {
		const name = Format.paint('help.name')(this.data.name);
		const version = Format.apply(this.data.version, (v) => (v ? `v${v}` : ''));

		const header: string[] = [name, version].filter((x) => x);
		const options = this.options();

		const output = flatten([header, '', options]);

		return output.join('\n');
	};

	private options = () => {
		const positionals = new PrettyOption('positional', this.data.positionals);
		const flags = new PrettyOption('flag', Object.values(this.data.flags));

		const maxSize = Math.max(positionals.getMaxColSize(), flags.getMaxColSize());

		const output: string[] = [positionals.format(maxSize), flags.format(maxSize)].filter((x) => x);

		return output.join('\n');
	};
}
