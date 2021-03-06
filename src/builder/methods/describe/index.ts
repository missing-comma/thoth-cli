import { Binder } from '~cli/utils';
import { Instance } from '../../loader';

export function describe(this: Instance, description: string): Instance {
	this.data.description = description;
	return this;
}

export type DescribeFn = Binder.StripThis<typeof describe>;
