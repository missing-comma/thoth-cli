import chalk from 'chalk';
import { Palette, PaletteFactoryAdapter, PaletteFactory } from './painter';
import { GeneralFunctionsFormat, GeneralMethods } from './general-functions';
import { FormatFn, Input } from './protocol';
import * as Help from './helpers';
export class FormatServiceClass extends GeneralFunctionsFormat {
	public readonly help = Help;
	public readonly palette: Palette;
	constructor(paletteFactory: PaletteFactory) {
		super();
		this.palette = paletteFactory.make();
	}

	apply = (input: Input | undefined, ...styles: Array<FormatFn | GeneralMethods>): string => {
		const styleFns: FormatFn[] = styles.map((style) => {
			if (typeof style === 'string') {
				return this[style];
			}
			return style;
		});

		const output = styleFns.reduce((value, styleFn) => {
			return styleFn(value);
		}, input);

		return output as string;
	};

	combine = (...styles: Array<FormatFn | GeneralMethods>): FormatFn => {
		const styleFns: FormatFn[] = styles.map((style) => {
			if (typeof style === 'string') {
				return this[style];
			}
			return style;
		});

		const combinedFn = (input?: Input) => {
			const output = styleFns.reduce((value, styleFn) => {
				return styleFn(value);
			}, input);

			return output as string;
		};

		return combinedFn;
	};
}

export const makeFormat = () =>
	new FormatServiceClass(
		new PaletteFactoryAdapter({
			chalk,
		}),
	);
