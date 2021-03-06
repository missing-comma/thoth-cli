import { Format } from '~cli/services/format';
import { Binder } from '~cli/utils';
import { Instance } from '../../loader';

function validateRequired(this: Instance, argv: any): void {
	const requiredOptions = [
		...Object.values(this.data.flags).filter((flag) => flag.required),
		...this.data.positionals.filter((positional) => positional.required),
	];

	requiredOptions.forEach((option) => {
		const exists = argv[option.key] !== undefined;
		if (!exists) {
			const optionType = 'index' in option ? 'parameter' : 'flag';
			throw new Error(`Missing required ${optionType}: [ ${Format.underline(option.key)} ]`);
		}
	});
}

export function validate(this: Instance, argv: any): void {
	validateRequired.bind(this)(argv);
}

export type ValidateFn = Binder.StripThis<typeof validate>;
