import React from "react";

function ReusableForm({ form, errors, onChange, onSubmit, fields }) {
	return (
		<form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">

			{fields.map((field, i) => (
				<div
					key={i}
					className={`flex flex-col gap-1 ${field.type === "textarea" ? "col-span-2" : ""}`}
				>
					<label className="text-[16px] font-medium">
						{field.label} {field.required && "*"}
					</label>

					{field.type === "select" ? (
						<select
							name={field.name}
							value={form[field.name]}
							onChange={onChange}
							className="p-2 border rounded-xl"
						>
							<option value="">-- select --</option>
							{field.options?.map((opt, idx) => (
								<option key={idx} value={opt}>{opt}</option>
							))}
						</select>
					) : field.type === "textarea" ? (
						<textarea
							name={field.name}
							value={form[field.name]}
							onChange={onChange}
							className="p-2 border rounded-xl resize-none"
							rows="4"
						></textarea>
					) : (
						<input
							type={field.type}
							name={field.name}
							value={form[field.name]}
							onChange={onChange}
							className="p-2 border rounded-xl"
						/>
					)}

					{errors[field.name] && (
						<p className="text-red-600 text-sm">{errors[field.name]}</p>
					)}
				</div>
			))}

			<button
				type="submit"
				className="bg-blue-600 text-white py-2 rounded-xl col-span-2"
			>
				Save Profile
			</button>
		</form>
	);
}

export default ReusableForm;
