import { BuilderData } from '~cli/types';
import { PainterCreatorAdapter, Painter } from '~cli/models/colorized-help/painter';
import { flatten } from 'ramda';
import { Format } from '~cli/services/format';
import { PrettyOption } from './pretty-option';
import { ColorizedHelp } from './protocol';

export class ColorizedHelpAdapter implements ColorizedHelp {
	private readonly paint: Painter;

	constructor(private readonly data: BuilderData, paint?: Painter) {
		const palette = Format.palette.Help.create();
		this.paint = paint || new PainterCreatorAdapter(palette).create();
	}

	parse = (): string => {
		const name = this.paint.name(this.data.name);
		const version = Format.apply(this.data.version, (v) => `v${v}`);

		const header: string[] = [name, version];
		const options = this.options();

		const output = flatten([header, '', options]);

		return output.join('\n');
	};

	private options = () => {
		const positionals = new PrettyOption('positional', this.paint, this.data.positionals);
		const flags = new PrettyOption('flag', this.paint, Object.values(this.data.flags));

		const maxSize = Math.max(positionals.getMaxColSize(), flags.getMaxColSize());

		const output: string[] = [positionals.format(maxSize), flags.format(maxSize)].filter((x) => x);

		return output.join('\n');
	};
}
