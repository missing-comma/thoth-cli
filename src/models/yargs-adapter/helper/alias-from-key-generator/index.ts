export function aliasFromKeyGenerator(key: string): string {
	const words = key.split(/\W/g);
	return words.map((x) => x.charAt(0)).join('');
}
