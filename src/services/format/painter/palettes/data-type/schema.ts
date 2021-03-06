import { FormatFn } from '~cli/services/format/protocol';

export interface DataTypePainter {
	string: FormatFn;

	boolean: FormatFn;
	number: FormatFn;
	choices: FormatFn;
}
