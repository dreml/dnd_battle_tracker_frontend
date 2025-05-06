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

export const sortByField = <T>(field: keyof T, asc: boolean = true) => {
	return (a: T, b: T) => (asc ? a[field] - b[field] : b[field] - a[field]);
};

export const uniqueId = () => {
	const dateString = Date.now().toString(36);
	const randomness = Math.random().toString(36).substr(2);
	return dateString + randomness;
};
