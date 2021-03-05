import { PainterUtils } from '~cli/services/format/helpers/painter-utils';
import { Utils } from '~cli/utils';
import { HelpPainter } from './schema';

type PartialHelp = Utils.DeepPartial<HelpPainter>;

const customFallthrough: PartialHelp = {
	flag: {
		required: (isRequired?: boolean) => (isRequired ? 'required' : ''),
	},
	positional: {
		required: (isRequired?: boolean) => (isRequired ? 'required' : ''),
	},
};

export function makePainter() {
	const { eitherAt } = new PainterUtils(customFallthrough);

	return (painter: PartialHelp = {}) => ({
		name: eitherAt('name', painter),
		version: eitherAt('version', painter),
		example: eitherAt('example', painter),
		usage: eitherAt('example', painter),
		flag: {
			alias: eitherAt('flag.alias', painter),
			description: eitherAt('flag.description', painter),
			required: eitherAt('flag.required', painter),
		},
		positional: {
			alias: eitherAt('positional.alias', painter),
			description: eitherAt('positional.description', painter),
			required: eitherAt('positional.required', painter),
		},
	});
}
