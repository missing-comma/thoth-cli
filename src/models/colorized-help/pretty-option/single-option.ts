import { Format } from '~cli/services/format';
import { HelpPainterOptionKeys } from '~cli/services/format/painter/palettes/help/schema';
import { OptionType, Option } from './types';

export class PrettySingleOption<T extends OptionType> {
	constructor(private readonly type: 'flags' | 'positionals', private readonly opt: Option<T>) {}

	public aliasWidth = () => {
		const formattedAlias = this.formatAlias(false);
		return formattedAlias.length;
	};

	public formatAlias = (color?: boolean) => {
		const aliases = [this.opt.key, ...(this.opt.alias || [])].sort((a, b) => a.length - b.length);

		let formatted = aliases.map((alias) => Format.tail(alias.trim()));
		if (color) {
			formatted = formatted.map((alias) => this.paint('alias')(alias));
		}

		const combined = formatted.join(', ');
		return combined;
	};

	public format = (colSize: number) => {
		const alias = this.formatAlias(true);
		const aliasDescriptionPad = Format.help.getPad(alias, colSize + 2, ' ');

		const description = this.description();

		const badges = this.badges();

		return [alias, aliasDescriptionPad, description, ' ', badges].join('');
	};

	private optionType = () => {
		const defaultStr = this.opt.default ? ` = ${this.opt.default}` : '';
		const type =
			this.opt.type === 'choices'
				? (this.opt.choices as any)?.map(Format.quotationMarks).join(' | ')
				: this.opt.type;

		return Format.apply(`${type}${defaultStr}`, 'padSides', 'brackets', this.paintOption());
	};

	private badges = () => {
		const optionType = this.optionType();
		const required = this.required();

		return [optionType, required].filter((x) => x).join(' ');
	};

	private description = () => {
		return this.paint('description')(this.opt.description);
	};

	private paint = (key: HelpPainterOptionKeys): Format.Fn => {
		return Format.paint(`help.${this.type}${key}` as any);
	};

	private required = () => {
		if (this.opt.required) {
			const required = 'required';
			return Format.apply(required, 'padSides', 'brackets', Format.paint('help.flag.required'));
		}
		return '';
	};

	private paintOption = () => {
		const { type } = this.opt;
		type Color = `data-entry.${Exclude<typeof type, 'path'>}`;
		return Format.paint(`data-entry.${this.opt.type}` as Color);
	};
}
