import { Positional, Flag } from '~cli/types';

export interface BuilderData {
	name: string;

	version?: string;

	description?: string;

	positionals: Positional.Default[];

	flags: Record<string, Flag.Default>;
}
