import { Yargs } from '~cli/protocols';
import { Positional, Flag, IError } from '~cli/types';
import { BuilderDependencies } from './dependencies';

type PublicProperties = {};

abstract class PrivateProperties {
	protected deps!: BuilderDependencies;

	protected yargModifiers!: Array<(yargs: Yargs) => Yargs>;

	protected data!: {
		name: string;

		version?: string;

		description?: string;

		positionals: Positional.Default[];

		flags: Record<string, Flag.Default>;
	};

	protected errors!: IError[];
}

export namespace BuilderProps {
	export type Public = PublicProperties;

	export type Private = PrivateProperties;

	export type All = BuilderProps.Public & BuilderProps.Private;
}
