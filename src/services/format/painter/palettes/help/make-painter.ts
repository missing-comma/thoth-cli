import { PainterUtils } from '~cli/services/format/helpers/painter-utils';
import { prepend, Utils } from '~cli/utils';
import { HelpPainter } from './schema';

type PartialHelp = Utils.DeepPartial<HelpPainter>;

export function makePainter() {
	const { emptyFn } = new PainterUtils();

	return (painter: PartialHelp = {}): HelpPainter => {
		const base: HelpPainter = {
			name: emptyFn,
			version: emptyFn,
			example: emptyFn,
			usage: emptyFn,
			...prepend('flag', {
				alias: emptyFn,
				description: emptyFn,
				required: emptyFn,
			}),
			...prepend('positional', {
				alias: emptyFn,
				description: emptyFn,
				required: emptyFn,
			}),
		};

		return {
			...base,
			...(painter as HelpPainter),
		};
	};
}
