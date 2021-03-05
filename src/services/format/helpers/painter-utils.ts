import { FormatFn } from '../protocol';
import { path } from 'ramda';
import { Utils } from '~cli/utils';

const emptyFormat: FormatFn = (value?: string | number | boolean) => {
	if (value === 0) return '0';
	return value ? String(value) : '';
};

export class PainterUtils<T> {
	private readonly customFallThrough: Utils.DeepPartial<T>;
	constructor(customFallThrough: Utils.DeepPartial<T> = {}) {
		this.customFallThrough = customFallThrough;
	}

	public readonly eitherAt: Utils.EitherAtFn<T, FormatFn> = (
		k: keyof T | string,
		...srcs: Utils.DeepPartial<T>[]
	): FormatFn => {
		const key: string = k as string;
		let value: FormatFn = emptyFormat;
		const _srcs = [...srcs, this.customFallThrough];
		_srcs.some((src) => {
			const matched = path<any>(key.split('.'), src);
			if (matched !== undefined) {
				value = matched;
				return true;
			}
		});
		return value;
	};

	public readonly makeEitherAt: Utils.MakeEitherAtFn<T, FormatFn> = (...srcs: any[]) => {
		return (key: keyof T | string) => {
			return this.eitherAt(key as any, ...srcs);
		};
	};
}
