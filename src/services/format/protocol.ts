export type Input = string | boolean | number;

export interface FormatFn {
	(input?: Input): string;
}

export namespace FormatFn {
	export type Object = { [K: string]: FormatFn };
}

export interface PainterCreator<T> {
	readonly painter: T;
	get(key: keyof T): FormatFn;
}
