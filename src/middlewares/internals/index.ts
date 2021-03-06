import { prepend } from '~cli/utils';
import { colorizeHelp } from './colorize-help';

export const internalMiddlewares = prepend('internal', {
	'colorize-help': colorizeHelp,
});

export type InternalMiddleware = keyof typeof internalMiddlewares;

export const allInternalMiddlewaresKey = Object.keys(internalMiddlewares) as InternalMiddleware[];
