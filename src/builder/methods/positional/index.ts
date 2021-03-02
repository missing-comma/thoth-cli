import { DataEntry, Positional } from '~cli/types';
import { Instance } from '../../loader';

export function positional(this: Instance, key: string, value: Positional.Create): Instance {
	const matchingKey = this.data.positionals.find((p) => p.key === key);
	if (matchingKey) {
		return this.addError('positionals/duplicate-key', `Duplicate positional key found: ${key}`);
	}

	this.data.positionals.push({
		...value,
		key,
		index: this.data.positionals.length,
	});

	return this;
}

export interface PositionalFn<T> {
	<K extends string, Type extends DataEntry.SupportedTypes, Req extends boolean>(
		key: K,
		value: Positional.Create<Type, Req>,
	): Instance<Positional.AppendArg<T, Positional<K, Type, Req>>>;
}
