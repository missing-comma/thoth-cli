import { DataEntry } from './data-entry';

interface AdditionalFields {}

export type Flag<
	K extends string = string,
	T extends DataEntry.SupportedTypes = DataEntry.SupportedTypes,
	Req extends boolean = false
> = DataEntry<K, T, Req> & AdditionalFields;

export namespace Flag {
	export type Create<
		ST extends DataEntry.SupportedTypes = DataEntry.SupportedTypes,
		Req extends boolean = false
	> = Omit<Flag<string, ST, Req>, 'key'>;

	export type AppendArg<T, P extends Flag<string, DataEntry.SupportedTypes, boolean>> = T & DataEntry.ToArgField<P>;
}
