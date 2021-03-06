import { AddError } from './add-error';
import { PositionalFn } from './positional';
import { FlagFn } from './flag';
import { ParseFn } from './parse';
import { DescribeFn } from './describe';
import { VersionFn } from './version';
import { ValidateFn } from './validate';

type BuilderPublicMethods<T> = {
	positional: PositionalFn<T>;
	flag: FlagFn<T>;
	parse: ParseFn<T>;
	describe: DescribeFn;
	version: VersionFn;
};

abstract class BuilderPrivateMethods<T> {
	protected addError!: AddError;

	protected validate!: ValidateFn;
}

export namespace BuilderMethods {
	export type Public<T> = BuilderPublicMethods<T>;

	export type Private<T> = BuilderPrivateMethods<T>;

	export type All<T> = BuilderMethods.Public<T> & BuilderMethods.Private<T>;
}
