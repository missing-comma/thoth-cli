import { Utils } from '../types';

interface ICreateSelect {
	<K extends string>(active: K | Utils.Callback<never, K>): Utils.Select<K>;
	<K extends PropertyKey>(active: K | Utils.Callback<never, K>): Utils.Select<K>;
}

export const createSelect: ICreateSelect = (activeProperty: PropertyKey | Utils.Foo) => {
	return (selectObject: any) => {
		const active = typeof activeProperty === 'function' ? activeProperty() : activeProperty;

		if (active in selectObject) return selectObject[active];

		if ('default' in selectObject) return selectObject.default;

		return undefined;
	};
};
