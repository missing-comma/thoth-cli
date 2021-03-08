import { addCommand } from '~cli/index';

function mockArgv(...cmds: Array<string | number>) {
	process.argv = ['node-path', 'script-path', ...cmds.map(String)];
}

function main() {
	const cmd = addCommand()
		.version('0.0.0')
		.describe('Sample command')
		.flag('batata', {
			type: 'string',
			required: true,
			description: "It's a batata",
		})
		.positional('oi', {
			type: 'number',
			required: true,
		})
		.positional('gilmar', {
			type: 'choices',
			choices: ['a', 'b', 'c', 'd'],
		});

	// mockArgv('--batata', 2, 'oi', 2, 'gilmar', 'b');

	console.log(cmd.parse());
}

main();
