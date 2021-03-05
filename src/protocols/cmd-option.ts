import { Options, PositionalOptions } from 'yargs';
import { DataEntry } from '~cli/types';
export interface CmdOption<Data extends DataEntry.Default> {
	readonly typeof: DataEntry.Primitive;

	readonly data: Data;

	mapFlag: () => Options;
	mapPositional: () => PositionalOptions;
}
