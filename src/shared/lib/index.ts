export const sortByAlphabet = (a: string, b: string) => {
	if (a < b) {
		return -1;
	}
	if (a > b) {
		return 1;
	}
	return 0;
};
export const sortByNumber = (a: number, b: number) => a - b;
