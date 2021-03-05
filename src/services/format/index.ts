import { Palette as _Palette } from './painter';
import { FormatFn, Input as _Input } from './protocol';
import { makeFormat } from './load';
import { GeneralMethods } from './general-functions';

export declare namespace Format {
	export type Fn = FormatFn;
	export type Input = _Input;

	export type Palette = _Palette;

	export type Method = FormatFn | GeneralMethods;
}

export const Format = makeFormat();
