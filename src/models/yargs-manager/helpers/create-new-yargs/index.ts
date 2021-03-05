import yargs, { Argv } from 'yargs';
import { CreateNewYargs } from '../../protocols';

export class CreateNewYargsAdapter implements CreateNewYargs {
	/**
	 * @param {void}
	 *
	 * @return {@type {typeof yargs}}
	 */
	public create = (cmd: string[]): Argv => {
		const y: any = yargs(cmd);
		y.$0 = 'npm';
		return y;
	};
}
