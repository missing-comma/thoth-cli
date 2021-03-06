import chalk from 'chalk';
import { handleEmpty, checkSupport } from '../helpers';

import { FormatFn, Input } from '../protocol';

const asFormatFn = (name: string, cb: (str: string) => string): FormatFn => {
	return handleEmpty((input: Input): string => {
		const value = checkSupport(input, { string: true }, `GeneralFormat.${name}`);
		return cb(value);
	});
};

export class GeneralFunctionsFormat {
	tail = asFormatFn('tail', (str: string): string => {
		const tail = str.length > 1 ? '--' : '-';
		return `${tail}${str}`;
	});

	brackets = asFormatFn('brackets', (str: string): string => {
		return `[${str}]`;
	});

	dotProd = asFormatFn('dotProd', (str: string): string => {
		return `<${str}>`;
	});

	padSides = handleEmpty((str: Input): string => {
		return ` ${str} `;
	});

	underline = (str?: Input) => chalk.underline(str);

	quotationMarks = handleEmpty((str: Input): string => {
		return `"${str}"`;
	});
}

export type GeneralMethods = keyof GeneralFunctionsFormat;
