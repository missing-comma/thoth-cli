import { DataEntry } from './data-entry';

interface AdditionalFields {
	index: number;
}

export type Positional<
	K extends string = string,
	T extends DataEntry.SupportedTypes = DataEntry.SupportedTypes,
	Req extends boolean = false
> = DataEntry<K, T, Req> & AdditionalFields;

export namespace Positional {
	export type Create<
		ST extends DataEntry.SupportedTypes = DataEntry.SupportedTypes,
		Req extends boolean = false
	> = Omit<Positional<string, ST, Req>, 'index' | 'key'>;

	export type AppendArg<T, P extends Positional<string, DataEntry.SupportedTypes, boolean>> = T &
		DataEntry.ToArgField<P>;
}
