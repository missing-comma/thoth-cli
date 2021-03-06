import './config/polyfills';
import './usage';

export * from '~cli/protocols';
export * from '~cli/types';

import { Builder } from '~cli/builder';

export function addCommand(name: string = 'root', parent?: Builder) {
	return new Builder(name);
}
