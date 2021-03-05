import { hideBin } from 'yargs/helpers';
import { GetCommandLine } from '../../protocols';

export class GetCommandLineAdapter implements GetCommandLine {
	public get = (depth: number, base?: string[]): string[] => {
		let cmdline: string[] = base || hideBin(process.argv);
		if (depth > 0) {
			cmdline = cmdline.slice(depth);
		}
		return cmdline;
	};
}
