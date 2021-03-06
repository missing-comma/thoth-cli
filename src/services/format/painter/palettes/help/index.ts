import { Chalk } from 'chalk';
import { PainterCreator } from '~cli/services/format/protocol';
import { HelpPainter } from './schema';
import { makePainter } from './make-painter';

export class HelpPainterCreatorAdapter implements PainterCreator<HelpPainter> {
	public readonly painter: HelpPainter;
	constructor(private readonly chalk: Chalk) {
		const painter = makePainter();

		this.painter = painter({
			name: (s?: string) => (s ? this.chalk.red(s) : ''),
			version: (s?: string) => (s ? this.chalk.cyan(s) : ''),
			'flag.required': (s?: string) => (s ? chalk.red(s) : ''),
			'positional.required': (s?: string) => (s ? chalk.red(s) : ''),
		});
	}

	get = (key: keyof HelpPainter) => {
		return this.painter[key];
	};
}
