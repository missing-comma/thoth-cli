import { DataEntry } from './data-entry';

interface AdditionalFields {}

export type Flag<Key extends string, V extends DataEntry.Values> = DataEntry<Key, V> & AdditionalFields;

export namespace Flag {
	export type Default = Flag<string, DataEntry.Values>;

	export type Create<V extends DataEntry.Values = DataEntry.Values> = Omit<Flag<string, V>, 'key'>;
}
