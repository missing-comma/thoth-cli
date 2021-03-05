import { command } from 'thoth-cli';

console.clear();

const cmd = command('root').flag('batata', {
	type: 'string',
	description: 'Type batata',
});

console.log(cmd.parse());
