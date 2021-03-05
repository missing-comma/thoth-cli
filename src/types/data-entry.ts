interface PrimitiveParser {
	string: string;
	number: number;
	boolean: boolean;
}

type Choices = ReadonlyArray<string | number | true | undefined> | Array<string | number | true | undefined>;

type _Primitive = keyof PrimitiveParser;

type _SupportedTypes = _Primitive | 'choices' | 'path';

type ExtractDefault<Type extends _Primitive> = PrimitiveParser[Type];

type DataType<D extends DataEntryValues> = D extends { type: 'string' | 'path' }
	? string
	: D extends { type: 'number' }
	? number
	: D extends { type: 'boolean' }
	? boolean
	: D extends { type: 'choices'; choices?: ReadonlyArray<infer T> }
	? T
	: unknown;

type Ternary<Src, Key, Fallback> = Key extends keyof Src ? Src[Key] : Fallback;

export interface DataEntryValues<Type extends _SupportedTypes = _SupportedTypes> {
	default?: string | number | boolean;
	required?: boolean;
	type: Type;
	choices?: Choices;
}
export type DataEntry<Key extends string, V extends DataEntryValues> = {
	key: Key;
	alias?: string[];
	description?: string;
	example?: string[];
	default?: Ternary<V, 'default', never>;
	required?: Ternary<V, 'required', false>;
	choices?: Ternary<V, 'choices', []>;
	type: Ternary<V, 'type', unknown>;
};

export type AppendUndefinedToValue<D extends DataEntryValues> = [D['default']] extends [undefined]
	? false extends D['required']
		? undefined
		: never
	: never;

type DD1 = DataEntry<'a', { type: 'choices'; choices: number[]; required: false }>;
type DD2 = DataEntry<'a', { type: 'choices'; choices: number[]; required: false; default: 1 }>;
type DD3 = DataEntry<'a', { type: 'choices'; choices: number[]; required: true }>;
type DD4 = DataEntry<'a', { type: 'choices'; choices: number[]; required: true; default: 1 }>;

type Nothing<XX extends DataEntryValues> = DataEntry.ExtractType<XX>;

type A = Nothing<DD1>;
type B = Nothing<DD2>;
type C = Nothing<DD3>;
type X = Nothing<DD4>;

type __ = [A, B, C, X];

export namespace DataEntry {
	export type Primitive = _Primitive;

	export type Values<Type extends _SupportedTypes = _SupportedTypes> = DataEntryValues<Type>;

	export type SupportedTypes = _SupportedTypes;
	export type Default = DataEntry<string, DataEntry.Values>;
	export type ExtractType<V extends DataEntryValues> = DataType<V> | AppendUndefinedToValue<V>;

	export type AppendArg<T, Key extends string, V extends DataEntryValues> = T &
		{ [K in Key]: DataEntry.ExtractType<V> };
}
