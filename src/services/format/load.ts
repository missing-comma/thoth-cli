import chalk from 'chalk';
import { PaletteFactory, Painter, Palette } from './painter';
import { CompositePainterCreator } from './painter/palettes';
import { GeneralFunctionsFormat, GeneralMethods } from './general-functions';
import { FormatFn, Input } from './protocol';
import * as Help from './helpers';

export class FormatServiceClass extends GeneralFunctionsFormat {
	private readonly painter: CompositePainterCreator;
	public readonly help = Help;
	constructor(paletteFactory: PaletteFactory) {
		super();
		this.painter = paletteFactory.make();
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

	paint = (k: keyof Palette): FormatFn => {
		return this.painter.get(k);
	};
}

export const makeFormat = () =>
	new FormatServiceClass(
		new PaletteFactory({
			chalk,
		}),
	);
