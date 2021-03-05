import './config/polyfills';

export * from '~cli/protocols';
export * from '~cli/types';

import { Builder } from '~cli/builder';

export function command(name: string = 'root', parent?: Builder) {
	return new Builder(name);
}
