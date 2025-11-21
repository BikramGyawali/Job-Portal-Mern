import React from "react";
import ButtonComp from "../ButtonComp";

function ReusableForm({ form, errors, onChange, onSubmit, fields, step, setStep, totalSteps, addSection, multipleEntries = false }) {
	const handlePrevious = () => {
		if (step > 1)
			setStep(step - 1)

	};
	// const handleNext = () => {
	// 	alert("hehe")
	// }
	return (
		<form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 backdrop-blur-lg bg-white/10 shadow-lg shadow-gray-700 rounded-2xl p-8 w-full border border-white/10 duration-500 
					">

			{fields.map((field, i) => {
				const isDisable = field.disableIf && form[field.disableIf] === true;
				return (
					<div
						key={i}
						className={`flex flex-col gap-1  ${field.type === "textarea" || field.type === "file" ? "col-span-2" : "col-span-1"} 				`}
					>
						<label className="text-[16px] font-medium">
							{field.label} {field.required && "*"}
						</label>

						{
							field.type === "file" ? (
								<input type={field.type}
									name={field.name}
									value={form[field.name]}
									onChange={onChange}
									className=" backdrop-blur-lg bg-white/10 shadow-lg shadow-white/10 rounded-3xl p-8 w-full border  duration-500" />
							) : field.type === "select" ? (
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
							)
								: field.type === "textarea" ? (
									<textarea
										name={field.name}
										value={form[field.name]}
										onChange={onChange}
										className="p-2 border rounded-xl resize-none"
										rows="4"
									></textarea>
								) : field.type === "checkbox" ? (
									<input
										name={field.name}
										value={form[field.name]}
										checked={form[field.name] || false}
										onChange={{
											traget: {
												name: field.name,
												value: e.target.checked
											}
										}}
										className="w-5 h-5"
									/>
								)

									: (
										<input
											type={field.type}
											name={field.name}
											value={form[field.name] || ""}
											onChange={onChange}
											disabled={isDisable}
											// max={new Date().toISOString().split("T")[0]}
											className={`p-2 border rounded-xl ${isDisable ? "bg-gray-200" : ""}`}

										/>
									)}

						{errors[field.name] && (
							<p className="text-red-600 text-sm">{errors[field.name]}</p>
						)}
					</div>
				)
			})}
			<div className="flex justify-between gap-5">

				{step > 1 && (<button
					type="submit"
					className="bg-blue-600 text-white py-2 rounded-xl cursor-pointer hover:bg-blue-700 transition w-full"
					onClick={handlePrevious}
				>
					Previous
				</button>)}

				<button type="submit"
					className="bg-blue-600 text-white py-2 rounded-xl cursor-pointer hover:bg-blue-700 transition w-full"

				>
					{step === totalSteps ? "Finish" : "Next"}
				</button>


			</div>
			{multipleEntries && (
				<div>
					<button type="button"
						className="bg-blue-600 text-white py-2 rounded-xl cursor-pointer hover:bg-blue-700 transition w-full"
						onClick={addSection}

					>
						+ Add Another
					</button>
				</div>
			)}
		</form>
	);
}

export default ReusableForm;
