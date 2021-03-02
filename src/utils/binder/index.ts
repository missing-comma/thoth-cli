import { Utils } from '../types';

export const get = <Instance>() => {
	const method = <InstanceMethod extends (this: Instance, ...args: any[]) => any>(instanceMethod: InstanceMethod) => {
		return (instance: Instance) => instanceMethod.bind(instance);
	};

	const prop = <Out extends object>(binder: (this: Instance) => Out) => {
		return (instance: Instance): Out => (binder as any).bind(instance)();
	};

	return { method, prop };
};

export type StripThis<T extends Utils.Foo> = (...args: Parameters<T>) => ReturnType<T>;
