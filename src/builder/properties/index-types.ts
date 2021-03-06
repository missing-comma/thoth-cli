import { Yargs } from '~cli/protocols';
import { IError } from '~cli/types';
import { BuilderData } from '~cli/types/builder-data';
import { BuilderDependencies } from './dependencies';
import { AllMiddlewares } from '~cli/middlewares';

type PublicProperties = {};

abstract class PrivateProperties {
	protected deps!: BuilderDependencies;

	protected yargModifiers!: Array<(yargs: Yargs) => Yargs>;

	protected data!: BuilderData;

	protected errors!: IError[];

	protected middlewares!: AllMiddlewares[];
}

export namespace BuilderProps {
	export type Public = PublicProperties;

	export type Private = PrivateProperties;

	export type All = BuilderProps.Public & BuilderProps.Private;
}
