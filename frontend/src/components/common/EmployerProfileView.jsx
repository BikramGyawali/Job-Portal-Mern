export default function EmployerProfileView({ profile }) {
	const data = profile?.profileData || profile || {};
	const apiUrl = import.meta.env.VITE_API_URL || window.location.origin;

	// const profileImage: data.image ? `${apiUrl}/uploads/images/${data.image}` : null;
	return (
		<div className=" p-4 m-6">

			<div className="flex justify-center">
				<img
					src={data?.image || "/default-company.png"}
					alt="Company Logo"
					className="w-36 h-36 rounded-2xl object-cover border shadow p-2"
				/>
			</div>


			<div className="grid md:grid-cols-2   gap-4 text-sm">
				<div><strong>Company Name:</strong> {data?.companyName || "N/A"}</div>
				<div><strong>Company Address:</strong> {data?.companyaddress || "N/A"}</div>

				<div><strong>Email:</strong> {data?.email || "N/A"}</div>
				<div><strong>Phone:</strong> {data?.phone || "N/A"}</div>

				<div><strong>Office Phone:</strong> {data?.officePhone || "N/A"}</div>
				<div><strong>PAN Card:</strong> {data?.panCard || "N/A"}</div>

				<div><strong>Industry:</strong> {data?.industry || "N/A"}</div>
				<div><strong>Company Size:</strong> {data?.companySize || "N/A"}</div>

				<div><strong>Website:</strong> {data?.companyWebsite || "N/A"}</div>
				<div><strong>Facebook:</strong> {data?.facebookLink || "N/A"}</div>

				<div><strong>HR Name:</strong> {data?.fname || "N/A"}</div>
				<div><strong>User ID:</strong> {data?.userId || "N/A"}</div>

				<div className="md:col-span-2">
					<strong>Company Intro:</strong> {data?.companyIntro || "N/A"}
				</div>
			</div>
		</div>
	);
}
