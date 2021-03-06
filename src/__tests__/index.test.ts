import { addCommand } from '~cli/index';

function mockArgv(...cmds: Array<string | number>) {
	process.argv = ['node-path', 'script-path', ...cmds.map(String)];
}

describe('Integration Tests', () => {
	test('Uses process.argv if no name is defined', () => {
		const cmd = addCommand().flag('batata', {
			type: 'string',
		});
		mockArgv('--batata', 'zero');
		expect(cmd.parse().batata).toBe('zero');
	});

	test('Supports multiple options', () => {
		const cmd = addCommand()
			.flag('batata', {
				type: 'string',
			})
			.flag('gilmar', {
				type: 'number',
			});
		mockArgv('--batata', 'zero', '--gilmar', 2);
		const argv = cmd.parse();

		expect(argv.batata).toBe('zero');
		expect(argv.gilmar).toBe(2);
		expect(typeof argv.gilmar).toBe('number');
	});
});
