export const simplifyNumber = (num: number) =>
	Math.abs(num) >= 1000 ?
		parseInt(num.toString()) :
		parseFloat(num.toLocaleString(undefined, {
			minimumFractionDigits: 2,
			maximumFractionDigits: Math.abs(num) < 0.01 ?
				2 : 0
		}));