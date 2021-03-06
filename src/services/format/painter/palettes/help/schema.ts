import { FormatFn } from '~cli/services/format/protocol';
import { Utils } from '~cli/utils';

export type HelpPainterOptionKeys = keyof HelperPainterFlags | keyof HelperPainterPositionals;

type HelperPainterFlags = {
	alias: FormatFn;
	description: FormatFn;
	required: FormatFn;
};

type HelperPainterPositionals = {
	alias: FormatFn;
	description: FormatFn;
	required: FormatFn;
};

type NestedHelperPainterFlags = Utils.Prepend<'flag', HelperPainterFlags>;

type NestedHelperPainterPositionals = Utils.Prepend<'positional', HelperPainterPositionals>;

export interface HelpPainter extends NestedHelperPainterFlags, NestedHelperPainterPositionals {
	name: FormatFn;

	usage: FormatFn;
	version: FormatFn;
	example: FormatFn;
}
