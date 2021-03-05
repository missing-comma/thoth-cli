import { DataEntry } from '~cli/types';
import { OptionTypeGetter } from '../../protocols';

export class OptionTypeGetterAdapter implements OptionTypeGetter {
	get = (data: DataEntry.Values): DataEntry.Primitive => {
		if (data.type === 'string') {
			return 'string';
		}
		if (data.type === 'path') {
			return 'string';
		}
		if (data.type === 'number') {
			return 'number';
		}
		if (data.type === 'boolean') {
			return 'boolean';
		}
		if (data.type === 'choices') {
			const type = typeof data.choices![0] === 'number' ? 'number' : 'string';
			return type;
		}
		throw new Error(`Failed to retrieve data for data entry: ${JSON.stringify(data)}`);
	};
}
