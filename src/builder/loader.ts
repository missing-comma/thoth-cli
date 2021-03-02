import { BuilderMethods } from './methods/index-types';
import { BuilderProps } from './properties/index-types';

// tslint:disable-next-line: no-empty-interface
export declare interface AbstractBuilder<T = {}> extends BuilderMethods.All<T>, BuilderProps.All {
	// empty
}

export abstract class AbstractBuilder<T = {}> implements AbstractBuilder<T> {}

type PrivateFields = keyof (BuilderMethods.Private<{}> & BuilderProps.Private);

// export type Instance<T = {}> = Omit<AbstractBuilder<T>, PrivateFields>;

export type Instance<T = any> = AbstractBuilder<T>;

export type Properties<T = {}> = Omit<AbstractBuilder<T>, keyof BuilderMethods.All<T>>;
