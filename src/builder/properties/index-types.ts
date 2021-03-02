import { Positional, Flag, IError } from '~cli/types';

type PublicProperties = {};

abstract class PrivateProperties {
	protected data!: {
		version?: string;

		description?: string;

		positionals: Positional[];

		flags: Record<string, Flag>;
	};

	protected errors!: IError[];
}

export namespace BuilderProps {
	export type Public = PublicProperties;

	export type Private = PrivateProperties;

	export type All = BuilderProps.Public & BuilderProps.Private;
}
