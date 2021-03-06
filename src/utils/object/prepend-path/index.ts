import { Utils } from '~cli/utils/types';

export const prepend = <T extends Record<string, any>, Key extends string, Join extends string = '.'>(
	key: Key,
	src: T,
	join?: Join,
): Utils.Prepend<Key, T, Join> => {
	const out = {} as any;

	Object.keys(src).forEach((k) => {
		const next = `${key}${join || '.'}${k}`;
		out[next] = src[k];
	});

	return out;
};
