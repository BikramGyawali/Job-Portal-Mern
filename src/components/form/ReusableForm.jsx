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
	entriesCount = 1,
	setCurrentEntryIndex = () => { },
	currentEntryIndex = 0,
	multipleEntries = false
}) {
	const today = new Date().toISOString().split("T")[0];

	const handlePrevious = (e) => {
		e.preventDefault();
		if (step > 1) setStep(step - 1);
	};

	return (
		<form
			onSubmit={onSubmit}
			className="grid grid-cols-1 sm:grid-cols-2 gap-4 backdrop-blur-lg bg-white/10 shadow-lg shadow-gray-700 rounded-2xl p-8 w-full border border-white/10 duration-500"
		>
			{entriesCount > 1 && (
				<div className="col-span-2 flex gap-2 mb-2">
					{Array.from({ length: entriesCount }).map((_, idx) => (
						<button
							key={idx}
							type="button"
							onClick={() => setCurrentEntryIndex(idx)}
							className={`px-3 py-1 rounded ${idx === currentEntryIndex ? "bg-blue-600 text-white" : "bg-gray-200"
								}`}
						>
							{idx + 1}
						</button>
					))}
				</div>
			)}

			{fields.map((field, i) => (
				<div
					key={i}
					className={`flex flex-col gap-1 ${field.type === "textarea" || field.type === "file" ? "col-span-2" : "col-span-1"
						}`}
				>
					<label className="text-[16px] font-medium">
						{field.label} {field.required && "*"}
					</label>

					{/* FILE: do NOT bind value to file inputs (causes the "filename" error) */}
					{field.type === "file" ? (
						<input
							type="file"
							name={field.name}
							onChange={onChange}
							className="backdrop-blur-lg bg-white/10 shadow-lg shadow-white/10 rounded-3xl p-5 w-full border duration-500"
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
								<option key={idx} value={opt}>
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
						/>
					) : field.type === "checkbox" ? (
						<input
							type="checkbox"
							name={field.name}
							checked={!!form[field.name]}
							onChange={(e) => onChange({ target: { name: field.name, value: e.target.checked } })}
							className="w-5 h-5"
						/>
					) : field.type === "date" ? (
						<input
							type="date"
							name={field.name}
							value={form[field.name] ?? ""}
							onChange={onChange}
							max={field.name === "dob" || field.name === "sdate" ? today : undefined} // restrict future for dob/sdate
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

			<div className="flex justify-between gap-5 col-span-2">
				{step > 1 && (
					<button
						type="button"
						onClick={handlePrevious}
						className="bg-blue-600 text-white py-2 rounded-xl cursor-pointer hover:bg-blue-700 transition w-full"
					>
						Previous
					</button>
				)}

				<button
					type="submit"
					className="bg-blue-600 text-white py-2 rounded-xl cursor-pointer hover:bg-blue-700 transition w-full"
				>
					{step === totalSteps ? "Finish" : "Next"}
				</button>
			</div>

			{multipleEntries && addSection && (
				<div className="col-span-2 mt-2">
					<button
						type="button"
						onClick={addSection}
						className="bg-blue-600 text-white py-2 rounded-xl cursor-pointer hover:bg-blue-700 transition w-full"
					>
						+ Add Another
					</button>
				</div>
			)}
		</form>
	);
}

export default ReusableForm;
