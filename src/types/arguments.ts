export type Arguments<T = {}> = T & {
	/** Non-option arguments */
	_: Array<string | number>;
	/** The script name or node command */
	$0: string;
	/** All remaining options */
	[argName: string]: unknown;
};
