import React from "react";

function ReusableForm({
	form,
	errors,
	onChange,
	onSubmit,
	fields,
	step,
	setStep,
	totalSteps,
	addSection,
	entriesCount,
	setCurrentEntryIndex,
	currentEntryIndex,
}) {
	const maxDate = new Date().toISOString().split("T")[0];

	const handlePrev = (e) => {
		e.preventDefault();
		if (step > 1) setStep(step - 1);
	};

	const handleNextOrSubmit = (e) => {
		e.preventDefault();
		onSubmit(e);
	};

	return (
		<form
			onSubmit={handleNextOrSubmit}
			className="grid grid-cols-1 sm:grid-cols-2 gap-4 backdrop-blur-lg bg-white/10 shadow-lg shadow-gray-700 rounded-2xl p-8 w-full border border-white/10 duration-500"
		>
			{/* MULTIPLE ENTRY INDEX BUTTONS */}
			{entriesCount > 1 && (
				<div className="col-span-2 flex gap-2">
					{Array.from({ length: entriesCount }).map((_, idx) => (
						<button
							key={idx}
							type="button"
							onClick={() => setCurrentEntryIndex(idx)}
							className={`px-3 py-1 rounded-xl ${idx === currentEntryIndex
								? "bg-blue-600 text-white"
								: "bg-gray-200 text-gray-700"
								}`}
						>
							{idx + 1}
						</button>
					))}
				</div>
			)}

			{/* FIELDS */}
			{fields.map((field, i) => (
				<div
					key={i}
					className={`flex flex-col gap-1 ${field.type === "textarea" || field.type === "file"
						? "col-span-2"
						: "col-span-1"
						}`}
				>
					<label className="text-[16px] font-medium">
						{field.label} {field.required && "*"}
					</label>

					{/* FILE INPUT */}
					{field.type === "file" ? (
						<input
							type="file"
							name={field.name}
							onChange={onChange}
							className="p-5 border rounded-xl"
						/>

					) : field.type === "select" ? (
						<select
							name={field.name}
							value={form[field.name] ?? ""}
							onChange={onChange}
							className="p-2 border rounded-xl"
						>
							<option value="">-- select --</option>
							{field.options?.map((opt, idx) => (
								<option key={idx} value={opt} className="  bg-white !hover:bg-red-800">
									{opt}
								</option>
							))}
						</select>

					) : field.type === "textarea" ? (
						<textarea
							name={field.name}
							value={form[field.name] ?? ""}
							onChange={onChange}
							rows="4"
							className="p-2 border rounded-xl resize-none"
						></textarea>

					) : field.type === "checkbox" ? (
						<input
							type="checkbox"
							name={field.name}
							checked={!!form[field.name]}
							onChange={(e) =>
								onChange({
									target: { name: field.name, value: e.target.checked },
								})
							}
							className="h-5 w-5"
						/>

					) : field.type === "date" ? (
						<input
							type="date"
							name={field.name}
							value={form[field.name] ?? ""}
							onChange={onChange}
							max={maxDate}
							className="p-2 border rounded-xl"
						/>

					) : (
						<input
							type={field.type}
							name={field.name}
							value={form[field.name] ?? ""}
							onChange={onChange}
							className="p-2 border rounded-xl"
						/>
					)}

					
					{errors && errors[field.name] && (
						<p className="text-red-600 text-sm">{errors[field.name]}</p>
					)}
				</div>
			))}

			{/* BUTTONS */}
			<div className="col-span-2 flex gap-5">
				{step > 1 && (
					<button
						className="bg-blue-600 text-white py-2 rounded-xl w-full hover:bg-blue-700"
						onClick={handlePrev}
					>
						Previous
					</button>
				)}

				<button
					type="submit"
					className="bg-blue-600 text-white py-2 rounded-xl w-full hover:bg-blue-700"
				>
					{step === totalSteps ? "Finish" : "Next"}
				</button>
			</div>

			{/* ADD SECTION */}
			{addSection && (
				<div className="col-span-2">
					<button
						type="button"
						onClick={addSection}
						className="bg-green-600 text-white py-2 rounded-xl w-full hover:bg-green-700"
					>
						+ Add Another
					</button>
				</div>
			)}
		</form>
	);
}

export default ReusableForm;
