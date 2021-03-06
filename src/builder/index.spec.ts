import { Builder } from './index';

const makeSut = () => new Builder('teste');

describe('Builder Composite Test', () => {
	test("Can access it's properties", () => {
		const sut = makeSut();

		expect(sut.positional).toBeDefined();

		expect(sut.structure).toBeDefined();
		expect(sut.structure.flags).toBeDefined();
		expect(sut.structure.flags).toEqual({});
	});

	test('Calling positional modifies the instance', () => {
		const sut = makeSut();

		expect(sut.structure.positionals.length).toEqual(0);

		sut.positional('batata', {
			type: 'string',
		});

		expect(sut.structure.positionals.length).toEqual(1);
		expect(sut.structure.positionals[0].index).toEqual(0);
	});

	test('Calling flag modifies the instance', () => {
		const sut = makeSut();

		const countFlag = () => Object.keys(sut.structure.flags).length;

		expect(countFlag()).toEqual(0);

		sut.flag('batata', {
			type: 'string',
		});

		expect(sut.structure.flags.batata.type).toEqual('string');
		expect(countFlag()).toEqual(1);
	});

	// test('Test type', () => {
	// 	const sut = makeSut()
	// 		.positional('a', { type: 'number', required: false })
	// 		.positional('b', { type: 'string' })
	// 		.positional('c', { type: 'boolean', default: 'boolean' })
	// 		.positional('d', { type: 'boolean', required: true, default: 'boolean' })
	// 		.positional('e', { type: 'boolean', required: true });

	// 	const argv = sut.parse();

	// 	argv.a;
	// });
});
