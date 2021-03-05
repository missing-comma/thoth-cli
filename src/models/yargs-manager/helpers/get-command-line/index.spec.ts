import { GetCommandLineAdapter } from './index';

const mockCommandLine = (size: number) => {
	return 'abcdefghijklmnopqrstuvxywz'.split('').splice(0, size);
};

const makeSut = () => {
	return new GetCommandLineAdapter();
};

describe('Get-Command-Line', () => {
	new Array(5).fill('').forEach((_, depth) => {
		test(`crops the src cmd properly for depth = ${depth}`, () => {
			const sut = makeSut();

			const cmd = mockCommandLine(5);

			expect(sut.get(depth, cmd)).toEqual(depth > 0 ? cmd.slice(depth) : cmd);
		});
	});

	test('Should crop args from cmd in proper order', () => {
		const input = ['a', 'b', 'c', 'd'];

		const sut = makeSut();

		expect(sut.get(0, input)).toEqual(['a', 'b', 'c', 'd']);
		expect(sut.get(1, input)).toEqual(['b', 'c', 'd']);
		expect(sut.get(2, input)).toEqual(['c', 'd']);
		expect(sut.get(3, input)).toEqual(['d']);
		expect(sut.get(4, input)).toEqual([]);
		expect(sut.get(5, input)).toEqual([]);
	});
});
