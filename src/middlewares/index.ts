import { internalMiddlewares, InternalMiddleware } from './internals';
import { externalMiddlewares, ExternalMiddleware } from './externals';
import { combineMiddlewares } from './utils';

export type AllMiddlewares = ExternalMiddleware | InternalMiddleware;

const allMiddlewares = {
	...internalMiddlewares,
	...externalMiddlewares,
};

export { internalMiddlewares };

export const parseMiddlewares = (keys: AllMiddlewares[]) => {
	return combineMiddlewares(keys.map((k) => allMiddlewares[k]));
};
