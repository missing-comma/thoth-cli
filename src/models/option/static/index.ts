import { factoryDependencies } from '../dependencies';
import { OptionStaticMap } from './map';

function makeStaticFactories() {
	const deps = factoryDependencies();

	const map = (): OptionStaticMap => new OptionStaticMap(deps.typeGetter, deps.commonOptionMapper);

	return { map };
}

export const optionStatic = makeStaticFactories();
