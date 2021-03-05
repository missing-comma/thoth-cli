import { Chalk } from 'chalk';
import { PainterCreator } from '~cli/services/format/protocol';
import { HelpPainter } from './schema';
import { makePainter } from './make-painter';

export class HelpPainterCreatorAdapter implements PainterCreator<HelpPainter> {
	constructor(private readonly chalk: Chalk) {}

	create() {
		const painter = makePainter();
		return painter({});
	}
}
