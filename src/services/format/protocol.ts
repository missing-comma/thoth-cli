export type Input = string | boolean | number;

export interface FormatFn {
	(input?: Input): string;
}

export namespace FormatFn {
	export type Object = Record<string, any>;
}

export interface PainterCreator<T extends FormatFn.Object> {
	create(): T;
}
