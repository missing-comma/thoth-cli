import { Flag, Positional } from '~cli/types';
export type OptionType = 'flag' | 'positional';
export type Option<T extends OptionType> = T extends 'flag' ? Flag.Default : Positional.Default;
