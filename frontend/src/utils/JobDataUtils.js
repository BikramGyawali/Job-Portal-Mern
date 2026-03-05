export const calculateJobDates = (postingDate, postingPeriod) => {

	const postedDate = new Date(postingDate);
	const formattedDate = postedDate.toISOString().split("T")[0];

	const periodDays = parseInt(postingPeriod);

	const expiryDate = new Date(postedDate);
	expiryDate.setDate(expiryDate.getDate() + periodDays);

	const today = new Date();
	const diffTime = expiryDate - today;

	const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	return {
		formattedDate,
		remainingDays
	};
};