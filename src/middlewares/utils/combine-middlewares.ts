import { Yargs } from '~cli/protocols';
import { Middleware } from '~cli/protocols/middleware';

export function combineMiddlewares(middlewares: Middleware[]): Middleware {
	return (deps: Middleware.Dependencies) => ({
		handler: <T>(builder: Yargs<T>): Yargs<T> => {
			return middlewares.reduce((prevBuilder: Yargs<T>, middleware: Middleware) => {
				return middleware(deps).handler(prevBuilder);
			}, builder);
		},
	});
}
