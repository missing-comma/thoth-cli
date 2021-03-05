import { Yargs } from '~cli/protocols';
import { IError } from '~cli/types';
import { BuilderData } from '~cli/types/builder-data';
import { BuilderDependencies } from './dependencies';

type PublicProperties = {};

abstract class PrivateProperties {
	protected deps!: BuilderDependencies;

	protected yargModifiers!: Array<(yargs: Yargs) => Yargs>;

	protected data!: BuilderData;

	protected errors!: IError[];
}

export namespace BuilderProps {
	export type Public = PublicProperties;

	export type Private = PrivateProperties;

	export type All = BuilderProps.Public & BuilderProps.Private;
}
