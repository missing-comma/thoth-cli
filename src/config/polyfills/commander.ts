import chalk from 'chalk';
import { Command } from 'commander';

/**
 * Return help for options.
 *
 * @return {string}
 */
Command.prototype.optionHelp = function () {
	const width = this.padWidth();

	// Append the help information
	return this.options
		.map((option: any) => {
			return (
				chalk.green(pad(option.flags, width)) +
				'  ' +
				option.description +
				(option.bool && option.defaultValue !== undefined
					? ' (default: ' + JSON.stringify(option.defaultValue) + ')'
					: '')
			);
		})
		.concat([chalk.green(pad('-h, --help', width)) + '  ' + 'output usage information'])
		.join('\n');
};

/**
 * Return command help documentation.
 *
 * @return {string}
 */
Command.prototype.commandHelp = function () {
	if (!this.commands.length) return '';

	const commands = this.prepareCommands();
	const width = this.padWidth();

	return [
		chalk.yellow('Available commands:'),
		commands
			.map((cmd: string) => {
				const desc = cmd[1] ? '  ' + strTruncate(cmd[1]) : '';
				return (desc ? chalk.green(pad(cmd[0].split(/ +/)[0], width)) : chalk.green(cmd[0])) + desc;
			})
			.join('\n')
			.replace(/^/gm, '  '),
		'',
	].join('\n');
};

/**
 * Return sub command help documentation.
 *
 * @return {string}
 */
Command.prototype.helpInformation = function () {
	let desc: string[] = [];
	if (this._description) {
		desc = [this._description, ''];

		const argsDescription = this._argsDescription;
		if (argsDescription && this._args.length) {
			const width = this.padWidth();
			desc.push(chalk.yellow('Arguments:'));
			desc.push('');
			this._args.forEach((arg: any) => {
				desc.push('  ' + pad(arg.name, width) + '  ' + argsDescription[arg.name]);
			});
			desc.push('');
		}
	}

	let cmdName = this._name;
	if (this._alias) {
		cmdName = cmdName + '|' + this._alias;
	}
	const usage = [chalk.yellow('Usage: ') + cmdName + ' ' + chalk.dim(this.usage()), ''];

	let cmds: string[] = [];
	const commandHelp = this.commandHelp();
	if (commandHelp) cmds = [commandHelp];

	const options = [chalk.yellow('Options:'), '' + this.optionHelp().replace(/^/gm, '  '), ''];

	return [''].concat(usage).concat(desc).concat(options).concat(cmds).concat('').join('\n');
};

/**
 * Pad `str` to `width`.
 *
 * @param {string} str
 * @param {number} width
 * @return {string}
 */
function pad(str: string, width: number) {
	const len = Math.max(0, width - str.length);
	return str + Array(len + 1).join(' ');
}

/**
 * Truncate string if longer that the specified length
 *
 * @param {string} str
 * @param {number} [length]
 * @return {string}
 */
function strTruncate(str: string, length = 30) {
	const dots = str.length > length ? '...' : '';
	return str.substring(0, length) + dots;
}
