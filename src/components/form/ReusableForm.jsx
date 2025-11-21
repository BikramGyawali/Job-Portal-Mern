import React from "react";
import ButtonComp from "../ButtonComp";

function ReusableForm({ form, errors, onChange, onSubmit, fields, step, setStep, totalSteps, addSection, entriesCount, setCurrentEntryIndex, currentEntryIndex }) {
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
		<form onSubmit={handleNextOrSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 bg-white/10 rounded-2xl">
			{entriesCount > 1 && (
				<div className="col-span-2 flex gap-2">
					{Array.from({ length: entriesCount }).map((_, idx) => (
						<button key={idx} type="button" onClick={() => setCurrentEntryIndex(idx)} className={`px-3 py-1 rounded ${idx === currentEntryIndex ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
							{idx + 1}
						</button>
					))}
				</div>
			)}

			{fields.map((field, i) => (
				<div key={i} className={`${field.type === "textarea" || field.type === "file" ? "col-span-2" : "col-span-1"} flex flex-col gap-1`}>
					<label className="text-sm font-medium">{field.label}{field.required && " *"}</label>

					{field.type === "file" ? (
						<input name={field.name} type="file" onChange={onChange} className="p-2 border rounded" />
					) : field.type === "select" ? (
						<select name={field.name} value={form[field.name] || ""} onChange={onChange} className="p-2 border rounded">
							<option value="">-- select --</option>
							{field.options?.map((opt, idx) => <option key={idx} value={opt}>{opt}</option>)}
						</select>
					) : field.type === "textarea" ? (
						<textarea name={field.name} value={form[field.name] || ""} onChange={onChange} rows="4" className="p-2 border rounded resize-none" />
					) : field.type === "checkbox" ? (
						<input type="checkbox" name={field.name} checked={!!form[field.name]} onChange={(e) => onChange({ target: { name: field.name, value: e.target.checked } })} />
					) : (
						<input
							type={field.type}
							name={field.name}
							value={form[field.name] || ""}
							onChange={onChange}
							max={field.type === "date" ? maxDate : undefined}
							className="p-2 border rounded"
						/>
					)}

					{errors && errors[field.name] && <p className="text-red-600 text-sm">{errors[field.name]}</p>}
				</div>
			))}

			<div className="col-span-2 flex gap-4">
				{step > 1 && <button onClick={handlePrev} className="bg-gray-600 text-white py-2 rounded w-full">Previous</button>}
				<button type="submit" className="bg-blue-600 text-white py-2 rounded w-full">{step === totalSteps ? "Finish" : "Next"}</button>
			</div>

			{addSection && (
				<div className="col-span-2">
					<button type="button" onClick={addSection} className="bg-green-600 text-white py-2 rounded w-full">+ Add Another</button>
				</div>
			)}
		</form>
	);
}

export default ReusableForm;
