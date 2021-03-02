import { DataEntry, Flag } from '~cli/types';
import { Instance } from '../../loader';

export function flag(this: Instance, key: string, value: Flag.Create): Instance {
	const matchingKey = key in this.data.flags;
	if (matchingKey) {
		return this.addError('flags/duplicate-key', `Duplicate flag key found: ${key}`);
	}

	this.data.flags[key] = {
		...value,
		key,
	};

	return this;
}

export interface FlagFn<T> {
	<K extends string, Type extends DataEntry.SupportedTypes, Req extends boolean>(
		key: K,
		value: Flag.Create<Type, Req>,
	): Instance<Flag.AppendArg<T, Flag<K, Type, Req>>>;
}
