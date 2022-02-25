const U = {
	capitalize: (str) => str
		.split(/\s+/)
		.map((sstr) => `${sstr.charAt(0).toUpperCase()}${sstr.slice(1).toLowerCase()}`)
		.join(" ")
};

export default U;