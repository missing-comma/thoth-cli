import { OptionType, Option } from './types';
import { PrettySingleOption } from './single-option';

export class PrettyOption<T extends OptionType> {
	private readonly data: PrettySingleOption<T>[];

	constructor(type: T, data: Option<T>[]) {
		const opts = type === 'flag' ? Object.values(data) : data;
		this.data = opts.map((d) => new PrettySingleOption<T>(`${type}s` as any, d));
	}

	get hasAny(): boolean {
		return this.data.length > 0;
	}

	public getMaxColSize = (): number => {
		return this.data.reduce((max, opt) => Math.max(max, opt.aliasWidth()), 0);
	};

	public format = (colSize: number): string => {
		if (this.data.length === 0) {
			return '';
		}
		return this.data.map((data) => data.format(colSize)).join('\n');
	};
}
