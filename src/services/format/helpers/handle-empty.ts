import { FormatFn, Input } from '../protocol';

export const handleEmpty = (cb: (str: Input) => string): FormatFn => {
	return (v?: string | number | boolean) => {
		if (v === undefined) {
			return '';
		}
		return cb(v);
	};
};
