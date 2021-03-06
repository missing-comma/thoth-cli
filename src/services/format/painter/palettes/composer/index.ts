import { PainterCreator } from '~cli/services/format/protocol';
import { Utils } from '~cli/utils';
import { emptyFormat } from '../../../helpers';
import { HelpPainter } from '../help/schema';
import { DataTypePainter } from '../data-type/schema';
import { CommonPainter } from '../common/schema';
export type CompositePainter = Utils.Prepend<'help', HelpPainter> &
	Utils.Prepend<'data-entry', DataTypePainter> &
	Utils.Prepend<'common', CommonPainter>;

interface CompositePainterHolder {
	help: PainterCreator<HelpPainter>;
	'data-entry': PainterCreator<DataTypePainter>;
	common: PainterCreator<CommonPainter>;
}

export class CompositePainterCreator {
	public readonly painter: CompositePainterHolder;

	constructor(
		help: PainterCreator<HelpPainter>,
		dataEntry: PainterCreator<DataTypePainter>,
		common: PainterCreator<CommonPainter>,
	) {
		const holder: CompositePainterHolder = {
			help,
			'data-entry': dataEntry,
			common,
		};
		this.painter = holder;
	}

	public get = (key: keyof CompositePainter) => {
		const [id, ...rest] = key.split('.') as Array<keyof CompositePainterHolder>;
		const painter: any = this.painter[id];
		return painter?.get(rest.join('.')) || emptyFormat;
	};
}
