import { FormatFn } from '~cli/services/format/protocol';

export interface CommonPainter {
	error: FormatFn;

	warn: FormatFn;
	success: FormatFn;

	underline: FormatFn;
}
