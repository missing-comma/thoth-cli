import { DataEntry } from '~cli/types';
import { Options, PositionalOptions } from 'yargs';

export interface OptionTypeGetter {
	get: (data: DataEntry.Values) => DataEntry.Primitive;
}

export type AnyOption = Options | PositionalOptions;
export type Transformations<Opt extends AnyOption> = Array<(opt: Opt) => Opt | void>;

export interface CommonOptionMapper {
	map: <Opt extends AnyOption>(data: DataEntry.Default, additional?: Transformations<Opt>) => Opt;
}

export interface ValueParser {
	parse: <T = any>(data: DataEntry.Values, value?: string) => T;
}
