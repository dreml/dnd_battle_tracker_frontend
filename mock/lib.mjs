const getRandomInt = (max) => Math.floor(Math.random() * max);

const uniqueId = () => {
	const dateString = Date.now().toString(36);
	const randomness = Math.random().toString(36).substr(2);
	return dateString + randomness;
};

export { getRandomInt, uniqueId };
