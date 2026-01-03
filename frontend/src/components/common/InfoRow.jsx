export const InfoRow = ({ label, value, full = false }) => {
	if (!value) return null;

	return (
		<p className={full ? "col-span-2" : ""}>
			<strong>{label}:</strong> {value}
		</p>
	);
};
