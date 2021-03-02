import { IError } from '~cli/types';
import { Binder } from '~cli/utils';
import { Instance } from '../../loader';

export function addError(this: Instance, name: string, description: string, type?: IError['type']): Instance {
	this.errors.push({
		name,
		description,
		type: type || 'builder',
	});
	return this;
}

export type AddError = Binder.StripThis<typeof addError>;
