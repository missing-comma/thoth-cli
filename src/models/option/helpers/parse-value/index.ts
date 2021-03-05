import { DataEntry } from '~cli/types';
import { ValueParser, OptionTypeGetter } from '../../protocols';

export class ValueParserAdapter implements ValueParser {
	constructor(private readonly typeGetter: OptionTypeGetter) {}

	parse = <T = any>(data: DataEntry.Values, value?: string): T => {
		return this.untypedParse(data, value);
	};

	private untypedParse = (data: DataEntry.Values, value?: string): any => {
		const isDefined = value !== undefined;
		const type = this.typeGetter.get(data);
		if (type === 'string') {
			return value ?? data.default;
		}
		if (type === 'number') {
			return isDefined ? Number(value) : data.default;
		}
		if (type === 'boolean') {
			return isDefined ? Boolean(value) : data.default;
		}
		return undefined;
	};
}
