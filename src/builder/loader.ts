import { BuilderMethods } from './methods/index-types';
import { BuilderProps } from './properties/index-types';
import { dependencyFactory, BuilderDependencies } from './dependencies';

// tslint:disable-next-line: no-empty-interface
export declare interface AbstractBuilder<T = {}> extends BuilderMethods.All<T>, BuilderProps.All {
	// empty
}

export abstract class AbstractBuilder<T = {}> implements AbstractBuilder<T> {
	protected constructor(deps?: Partial<BuilderDependencies>) {
		this.deps = dependencyFactory(deps);
	}
}

type PrivateFields = keyof (BuilderMethods.Private<{}> & BuilderProps.Private);

// export type Instance<T = {}> = Omit<AbstractBuilder<T>, PrivateFields>;

export type Instance<T = any> = AbstractBuilder<T>;

export type Properties<T = {}> = Omit<AbstractBuilder<T>, keyof BuilderMethods.All<T>>;
