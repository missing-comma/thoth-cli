import { AddError } from './add-error';
import { PositionalFn } from './positional';
import { FlagFn } from './flag';
import { ParseFn } from './parse';

type BuilderPublicMethods<T> = {
	positional: PositionalFn<T>;
	flag: FlagFn<T>;
	parse: ParseFn<T>;
};

abstract class BuilderPrivateMethods<T> {
	protected addError!: AddError;
}

export namespace BuilderMethods {
	export type Public<T> = BuilderPublicMethods<T>;

	export type Private<T> = BuilderPrivateMethods<T>;

	export type All<T> = BuilderMethods.Public<T> & BuilderMethods.Private<T>;
}
