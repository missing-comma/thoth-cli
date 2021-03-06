import { Binder } from '~cli/utils';
import { Instance } from '../../loader';

export function version(this: Instance, _version: string): Instance {
	this.data.version = _version;
	return this;
}

export type VersionFn = Binder.StripThis<typeof version>;
