import { OptionTypeGetter, ValueParser, CommonOptionMapper } from './protocols';
import { OptionTypeGetterAdapter, ValueParserAdapter, CommonOptionMapperAdapter } from './helpers';

export interface Dependencies {
	typeGetter: OptionTypeGetter;
	valueParser: ValueParser;
	commonOptionMapper: CommonOptionMapper;
}

export const factoryDependencies = (deps: Partial<Dependencies> = {}): Dependencies => {
	const typeGetter = deps.typeGetter || new OptionTypeGetterAdapter();
	const valueParser = deps.valueParser || new ValueParserAdapter(typeGetter);
	const commonOptionMapper = deps.commonOptionMapper || new CommonOptionMapperAdapter();

	return {
		typeGetter,
		valueParser,
		commonOptionMapper,
	};
};

export const dependencies = {
	OptionTypeGetter: OptionTypeGetterAdapter,
	ValueParser: ValueParserAdapter,
	CommonOptionMapper: CommonOptionMapperAdapter,
};
