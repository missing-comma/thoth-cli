import { BuilderData, IError } from '~cli/types';
import { Yargs } from './yargs';

export interface Middleware {
	(deps: Middleware.Dependencies): {
		handler<T = {}>(build: Yargs<T>): Yargs<T>;
	};
}

export namespace Middleware {
	export type AbortFn = (err: IError) => void;

	export type Dependencies<T = {}> = Partial<T> & {
		data: BuilderData;
	};
}
