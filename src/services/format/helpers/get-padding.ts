// const getPadSize = (source: string, size: number) => {
// 	return Math.max(source.length - size, 0);
// }

export const getPad = (source: string, size: number, fill: string = ' ') => {
	const padSize = Math.max(source.length - size, 0);
	return padSize ? fill.repeat(padSize) : '';
};
