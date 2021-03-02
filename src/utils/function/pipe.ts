import { pipe as RamdaPipe } from 'ramda';
import { Utils } from '~cli/utils/types';

export const pipe = <A>(...fns: Utils.PipeFn<A>[]): Utils.PipeFn<A> => {
	return (RamdaPipe as any)(...fns);
};
