import { Format } from '~cli/services/format';

export interface Painter {
	name: Format.Fn;

	usage: Format.Fn;
	version: Format.Fn;
	flag: {
		alias: Format.Fn;
		description: Format.Fn;
		required: Format.Fn;
	};
	positional: {
		alias: Format.Fn;
		description: Format.Fn;
		required: Format.Fn;
	};
	example: Format.Fn;
}

export interface PainterCreator {
	create(): Painter;
}
