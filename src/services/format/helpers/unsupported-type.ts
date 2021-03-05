import { Input } from '../protocol';

type SupportObjectTypes = {
	string: string;
	number: number;
	boolean: boolean;
};

type Keys = keyof SupportObjectTypes;

type SupportObject = Partial<Record<Keys, boolean>>;

type TrueKey<T extends SupportObject> = { [K in keyof T]: T[K] extends true ? K : never }[keyof T];

type TrueType<K> = K extends Keys ? Pick<SupportObjectTypes, K>[K] : never;

interface CheckSupport {
	<S extends SupportObject>(value: Input | undefined, supports: S, name?: string): TrueType<TrueKey<S>>;
}

export const checkSupport: CheckSupport = (
	value: Input | undefined,
	supportObj: SupportObject,
	name: string = '',
): any => {
	const supports: Keys[] = Object.entries(supportObj || {})
		.filter(([_, v]) => v)
		.map((entry) => entry[0]) as any[];
	performCheck(value, supports, name);
	return value;
};

const performCheck = (value: Input | undefined, supports: Keys[], name: string = ''): void => {
	if (value === undefined) return;
	const type = typeof value;
	if (!supports.includes(type as any)) {
		const handler = name ? `[ ${name} ]: ` : '';
		throw new Error(
			`${handler}received unsupported variable [ ${value} ] of value ${type}. ${handler}supported types = ${supports.join(
				',',
			)}`,
		);
	}
};
