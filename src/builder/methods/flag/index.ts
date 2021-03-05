import { Argv } from 'yargs';
import { DataEntry, Flag } from '~cli/types';
import { Instance } from '../../loader';

export function flag(this: Instance, key: string, value: Flag.Create): Instance {
	const matchingKey = key in this.data.flags;
	if (matchingKey) {
		return this.addError('flags/duplicate-key', `Duplicate flag key found: ${key}`);
	}

	const data: Flag.Default = {
		...value,
		key,
	};

	this.data.flags[key] = data;
	this.yargModifiers.push((y) => y.option(data));

	return this;
}

export interface FlagFn<T> {
	<K extends string, V extends Flag.Create<DataEntry.Values>>(key: K, value: V): Instance<
		DataEntry.AppendArg<T, K, V>
	>;
}
