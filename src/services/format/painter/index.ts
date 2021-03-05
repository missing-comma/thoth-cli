import { Chalk } from 'chalk';
import { PaletteFactory, Palette } from './protocol';

import { HelpPainterCreatorAdapter } from './palettes/help';

export class PaletteFactoryAdapter implements PaletteFactory {
	private readonly chalk: Chalk;
	constructor(deps: { chalk: Chalk }) {
		this.chalk = deps.chalk;
	}

	make = (): Palette => {
		const Help = new HelpPainterCreatorAdapter(this.chalk);
		return { Help };
	};
}

export * from './protocol';
