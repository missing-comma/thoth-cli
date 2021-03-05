import { Format } from '~cli/services/format';
import { Flag, Positional } from '~cli/types';
import { Painter } from '../painter';

export type OptionType = 'flag' | 'positional';

type Option<T extends OptionType> = T extends 'flag' ? Flag.Default : Positional.Default;

export class PrettyOption<T extends OptionType> {
	private readonly data: PrettySingleOption<T>[];

	constructor(type: T, paint: Painter, data: Option<T>[]) {
		const opts = type === 'flag' ? Object.values(data) : data;
		this.data = opts.map((d) => new PrettySingleOption<T>(paint[type], d));
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

class PrettySingleOption<T extends OptionType> {
	constructor(private readonly paint: Painter[OptionType], private readonly opt: Option<T>) {}

	public aliasWidth = () => {
		const formattedAlias = this.formatAlias(false);
		return formattedAlias.length;
	};

	public formatAlias = (color?: boolean) => {
		const aliases = [this.opt.key, ...(this.opt.alias || [])].sort((a, b) => a.length - b.length);

		let formatted = aliases.map((alias) => Format.tail(alias.trim()));
		if (color) {
			formatted = formatted.map((alias) => this.paint.alias(alias));
		}

		const combined = formatted.join(', ');
		return combined;
	};

	public format = (colSize: number) => {
		const alias = this.formatAlias(true);
		const aliasDescriptionPad = Format.help.getPad(alias, colSize, ' ');

		const description = this.description();

		const optionType = this.optionType();

		return [alias, aliasDescriptionPad, description, optionType].join('');
	};

	private optionType = () => {
		const defaultStr = this.opt.default ? ` = ${this.opt.default}` : '';
		const type = this.opt.type === 'choices' ? this.opt.choices?.join(' | ') : this.opt.type;
		return Format.brackets(`${type}${defaultStr}`);
	};

	private description = () => {
		return this.paint.description(this.opt.description);
	};
}
