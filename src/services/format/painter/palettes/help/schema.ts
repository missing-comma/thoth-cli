import { FormatFn } from '~cli/services/format/protocol';

export interface HelpPainter {
	name: FormatFn;

	usage: FormatFn;
	version: FormatFn;
	flag: {
		alias: FormatFn;
		description: FormatFn;
		required: FormatFn;
	};
	positional: {
		alias: FormatFn;
		description: FormatFn;
		required: FormatFn;
	};
	example: FormatFn;
}
