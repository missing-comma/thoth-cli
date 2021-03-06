import { DataEntry, Positional } from '~cli/types';
import { Instance } from '../../loader';

export function positional(this: Instance, key: string, value: Positional.Create<DataEntry.Values>): Instance {
	const matchingKey = this.data.positionals.find((p) => p.key === key);
	if (matchingKey) {
		return this.addError('positionals/duplicate-key', `Duplicate positional key found: ${key}`);
	}

	const data: Positional.Default = {
		...value,
		key,
		index: this.data.positionals.length,
	};

	this.data.positionals.push(data);
	this.yargModifiers.push((y) => y.positional(data));

	return this;
}

export interface PositionalFn<T> {
	<K extends string, V extends Positional.Create<DataEntry.Values>>(key: K, value: V): Instance<
		DataEntry.AppendArg<T, K, V>
	>;
}
