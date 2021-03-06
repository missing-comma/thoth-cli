import { Chalk } from 'chalk';
import { PainterCreator } from '~cli/services/format/protocol';
import { DataTypePainter } from './schema';

export class DataEntryPainterCreatorAdapter implements PainterCreator<DataTypePainter> {
	public readonly painter: DataTypePainter;
	constructor(chalk: Chalk) {
		this.painter = {
			string: chalk.green,
			boolean: chalk.red,
			number: chalk.yellow,
			// purple/pink
			choices: chalk.hex('#912391'),
		};
	}

	get = (key: keyof DataTypePainter) => {
		return this.painter[key];
	};
}
