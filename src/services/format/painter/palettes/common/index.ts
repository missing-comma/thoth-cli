import { Chalk } from 'chalk';
import { PainterCreator } from '~cli/services/format/protocol';
import { CommonPainter } from './schema';

export class CommonPainterCreatorAdapter implements PainterCreator<CommonPainter> {
	public readonly painter: CommonPainter;
	constructor(chalk: Chalk) {
		this.painter = {
			warn: chalk.green,
			success: chalk.greenBright,
			error: chalk.red,
			underline: chalk.underline,
		};
	}

	get = (key: keyof CommonPainter) => {
		return this.painter[key];
	};
}
