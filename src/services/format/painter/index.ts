import { Chalk } from 'chalk';
import { PainterCreator } from '../protocol';

import { CompositePainter, CompositePainterCreator } from './palettes';
import { DataEntryPainterCreatorAdapter } from './palettes/data-type';
import { HelpPainterCreatorAdapter } from './palettes/help';
import { CommonPainterCreatorAdapter } from './palettes/common';
export { CompositePainter as Palette } from './palettes';

export type Painter = PainterCreator<CompositePainter>;

export class PaletteFactory {
	private readonly chalk: Chalk;
	constructor(deps: { chalk: Chalk }) {
		this.chalk = deps.chalk;
	}

	make = (): CompositePainterCreator => {
		const help = new HelpPainterCreatorAdapter(this.chalk);
		const dataEntry = new DataEntryPainterCreatorAdapter(this.chalk);
		const common = new CommonPainterCreatorAdapter(this.chalk);

		return new CompositePainterCreator(help, dataEntry, common);
	};
}
