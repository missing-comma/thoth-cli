import { Binder } from '~cli/utils';
import { Instance } from '../../loader';

export function usage(this: Instance, _usage: string): Instance {
	// this.data.usage = _usage;
	return this;
}

export type AddError = Binder.StripThis<typeof usage>;
