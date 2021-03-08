import { ColorizedHelpAdapter } from '~cli/models/colorized-help';
import { Yargs, Middleware } from '~cli/protocols';
import { Format } from '~cli/services/format';

ColorizedHelpAdapter;
type AdditionalDependencies = {};

export const colorizeHelp = ({ data }: Middleware.Dependencies<AdditionalDependencies>) => {
	const colorize = new ColorizedHelpAdapter(data);
	return {
		handler<T = {}>(build: Yargs<T>): Yargs<T> {
			let helpShownCount = 0;
			build.modify((y) => {
				return y
					.help(false)
					.showHelpOnFail(false)
					.fail((msg: string, err: Error) => {
						if (helpShownCount >= 1) {
							return;
						}
						helpShownCount++;
						let helpOrVersion = false;
						if (process.argv.some((argv) => argv.match(/^(--help)|(-h)$/))) {
							helpOrVersion = true;
						}

						const helpMsg = colorize.parse();
						console.log(helpMsg);
						console.log();
						!helpOrVersion && console.log(Format.paint('common.error')(msg));
					});
			});

			return build;
		},
	};
};
