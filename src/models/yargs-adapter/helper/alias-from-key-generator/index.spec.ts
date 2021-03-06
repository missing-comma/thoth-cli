import { aliasFromKeyGenerator as sut } from './';

describe('Alias From Key Generator', () => {
	const testCases = [
		['batata', 'b'],
		['soul killer', 'sk'],
		['soul-killer', 'sk'],
		['soul.killer', 'sk'],
		['batata 2', 'b2'],
		['soul killer ', 'sk'],
		['soul-killer-', 'sk'],
		['soul.killer.', 'sk'],
		['soul killer a', 'ska'],
		['soul-killer-a', 'ska'],
		['soul.killer.a', 'ska'],
		['soul killer abb', 'ska'],
		['soul-killer-abb', 'ska'],
		['soul.killer.abb', 'ska'],
	];

	testCases.forEach(([input, output], index) => {
		test(`#${index} - ${input}`, () => {
			expect(sut(input)).toBe(output);
		});
	});
});
