import { ColorizedHelpAdapter } from '~cli/models/colorized-help';
import { Yargs, Middleware } from '~cli/protocols';
import { Format } from '~cli/services/format';

ColorizedHelpAdapter;
type AdditionalDependencies = {};

export const colorizeHelp = ({ data }: Middleware.Dependencies<AdditionalDependencies>) => {
	const colorize = new ColorizedHelpAdapter(data);
	return {
		handler<T = {}>(build: Yargs<T>): Yargs<T> {
			build.modify((y) =>
				y.fail((msg: string, err: Error) => {
					const helpMsg = colorize.parse();

					console.log(helpMsg);
					console.log();
					console.log(Format.paint('common.error')(msg));
				}),
			);

			return build;
		},
	};
};
