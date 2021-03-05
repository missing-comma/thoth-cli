import { HelpPainterCreatorAdapter } from './palettes/help';

export interface Palette {
	Help: HelpPainterCreatorAdapter;
}

export interface PaletteFactory {
	make: () => Palette;
}
