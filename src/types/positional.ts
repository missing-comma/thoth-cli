import { DataEntry } from './data-entry';

interface AdditionalFields {
	index: number;
}

export type Positional<Key extends string, V extends DataEntry.Values> = DataEntry<Key, V> & AdditionalFields;

export namespace Positional {
	export type Default = Positional<string, DataEntry.Values>;

	export type Create<V extends DataEntry.Values = DataEntry.Values> = Omit<Positional<string, V>, 'index' | 'key'>;
}
