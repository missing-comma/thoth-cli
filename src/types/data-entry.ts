type DefaultDataEntry = DataEntry<string, _SupportedTypes, boolean>;

type _SupportedTypes = string | number | boolean | Array<Readonly<string | number>>;

type _ExtractType<D extends DefaultDataEntry> = D['type'] extends Array<infer T> ? T : D['type'];

export interface DataEntry<Key extends string, Type extends _SupportedTypes, Req extends boolean> {
	key: Key;
	alias?: string[];

	description?: string;

	required?: Req;

	type: Type;

	example?: string[];
}

export namespace DataEntry {
	export type Default = DefaultDataEntry;

	export type SupportedTypes = _SupportedTypes;

	export type ExtractType<D extends DefaultDataEntry> = _ExtractType<D>;

	export type ToArgField<D extends DefaultDataEntry> = false extends D['required']
		? Partial<Record<D['key'], _ExtractType<D>>>
		: Record<D['key'], _ExtractType<D>>;
}
