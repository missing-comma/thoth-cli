import chalk from 'chalk';
import { platformJSON } from '~cli/assets';
import { createSelect, Utils } from '~cli/utils';

export class PlatformConstructor {
	public readonly select: Utils.Select<NodeJS.Platform>;
	public readonly humanReadableCurrPlatform: string;

	constructor(public readonly platforms: typeof platformJSON, public readonly curr: NodeJS.Platform) {
		this.platforms = platformJSON;
		this.select = createSelect(this.curr);
		this.humanReadableCurrPlatform = this.select({
			win32: 'Windows',
			linux: 'Linux',
			android: 'Android',
			default: "I don't know, lol",
		});
	}

	/**
	 * Check if the current platform is one of the above
	 * @param platforms
	 */
	public is = (...platforms: NodeJS.Platform[]) => {
		return platforms.some((p) => p === this.curr);
	};

	public unsupported = () => {
		console.log(`${chalk.red('Error: ')}[ ${chalk.cyan(this.curr)} ] is not a supported platform.`);
		console.log(chalk.red('Aborting.'));
		process.exit(0);
	};
}

export const Platform = new PlatformConstructor(platformJSON, process.platform);
