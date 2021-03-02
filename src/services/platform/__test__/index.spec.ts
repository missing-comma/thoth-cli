import { PlatformConstructor } from '../';

type PlatformJSON = { [P in NodeJS.Platform]: { key: P; name: string } };

const makePlatformJSONStub = (
	onValue?: <P extends NodeJS.Platform>(key: P) => Partial<PlatformJSON[P]>,
): PlatformJSON => {
	return new Proxy({} as any, {
		get: (target, key: any) => {
			const base = { key, name: key };
			return onValue
				? {
						...base,
						...onValue(key),
				  }
				: base;
		},
	});
};

const makeStubs = () => ({
	platformJSON: makePlatformJSONStub(),
	curr: 'linux' as NodeJS.Platform,
});

const makeSut = (partialStubs: Partial<ReturnType<typeof makeStubs>> = {}) => {
	const stubs = { ...makeStubs(), ...partialStubs };
	const sut = new PlatformConstructor(stubs.platformJSON, stubs.curr);
	return { sut, stubs };
};

describe('Platform Service Test', () => {
	test('Select returns value based on current platform', () => {
		const { sut } = makeSut({ curr: 'linux' });
		expect(sut.select({ android: 2, win32: 3 })).toBeUndefined();
		expect(sut.select({ android: 2, win32: 3, linux: 5 })).toBe(5);

		const { sut: sut2 } = makeSut({ curr: 'android' });
		expect(sut2.select({ android: 2, win32: 3, linux: 5 })).toBe(2);
		expect(sut2.select({ win32: 3, linux: 5 })).toBeUndefined();
	});

	describe('Platform.is', () => {
		const { sut } = makeSut({ curr: 'linux' });
		test('should return true if input array contains the current platform', () => {
			// Curr is first element of the array
			expect(sut.is('linux', 'aix', 'win32')).toBe(true);

			// Curr is not an edge element of the array
			expect(sut.is('aix', 'linux', 'win32')).toBe(true);

			// Curr is last element of the array
			expect(sut.is('aix', 'win32', 'linux')).toBe(true);

			// Curr is the only element of the array
			expect(sut.is('linux')).toBe(true);
		});

		test("should return false if input array doesn't contain the current platform", () => {
			expect(sut.is('aix', 'win32')).toBe(false);
			expect(sut.is()).toBe(false);
		});
	});
});
