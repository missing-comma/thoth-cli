import { PainterCreator } from './schema';
import { PainterUtils } from '~cli/services/format/helpers/painter-utils';
import { Format } from '~cli/services/format';
import { HelpPainter } from '~cli/services/format/painter/palettes/help/schema';

export class PainterCreatorAdapter implements PainterCreator {
	private readonly palette: HelpPainter;
	private readonly utils: PainterUtils<HelpPainter>;

	constructor(palette: HelpPainter) {
		this.palette = palette;
		this.utils = new PainterUtils(palette);
	}

	create() {
		const eitherAt = this.utils.makeEitherAt(this.palette);

		const makeStyle = (key: string, fns: Format.Method[]) => Format.combine(eitherAt(key), ...fns);

		return {
			name: makeStyle('name', []),
			version: makeStyle('version', []),
			example: makeStyle('example', []),
			usage: makeStyle('example', []),
			flag: {
				alias: makeStyle('flag.alias', []),
				description: makeStyle('flag.description', []),
				required: makeStyle('flag.required', []),
			},
			positional: {
				alias: makeStyle('positional.alias', []),
				description: makeStyle('positional.description', []),
				required: makeStyle('positional.required', []),
			},
		};
	}
}

export { PainterCreator };
export * from './schema';
