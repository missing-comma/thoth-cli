import { Painter } from '~cli/models/colorized-help/painter';
import { ColorizedHelpAdapter } from '~cli/models/colorized-help';
import { Yargs, Middleware } from '~cli/protocols';

ColorizedHelpAdapter;
type AdditionalDependencies = {
	paint?: Painter;
};

export const colorizeHelp = ({ data, paint }: Middleware.Dependencies<AdditionalDependencies>) => {
	const colorize = new ColorizedHelpAdapter(data, paint);
	return {
		handler<T = {}>(build: Yargs<T>): Yargs<T> {
			build.modify((y) =>
				y.fail((_: string, err: Error) => {
					const helpMsg = colorize.parse();
				}),
			);

			return build;
		},
	};
};
