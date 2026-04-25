
import React from "react";
import Select from 'react-select'

function ReusableForm({
	form,
	errors,
	onChange,
	onSubmit,
	fields,
	step,
	setStep,
	totalSteps,
	deleteSection,
	addSection,
	entriesCount,
	setCurrentEntryIndex,
	currentEntryIndex,
	isLoading = false,
	submitButtonText = "Submit",
	onClose,
	readonlyFields = [],
	
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
			encType="multipart/form-data"
			className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 md:p-8"
		>
			{entriesCount > 1 && (
				<div className="flex flex-wrap gap-2 mb-6">
					{Array.from({ length: entriesCount }).map((_, idx) => (
						<button
							key={idx}
							type="button"
							onClick={() => setCurrentEntryIndex(idx)}
							className={`w-8 h-8 rounded-full text-sm font-semibold transition-all duration-200 ${idx === currentEntryIndex
								? "bg-blue-600 text-white shadow-md scale-110"
								: "bg-gray-100 text-gray-600 hover:bg-gray-200"
								}`}
						>
							{idx + 1}
						</button>
					))}
				</div>
			)}

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
				{fields.map((field, i) => (
					<div
						key={i}
						className={`flex flex-col gap-1.5 ${field.type === "textarea" || field.type === "file"
							? "col-span-1 sm:col-span-2"
							: "col-span-1"
							}`}
					>
						<label className="text-sm font-semibold text-gray-700">
							{field.label}
							{field.required && <span className="text-red-500 ml-1">*</span>}
						</label>

						{field.type === "select" ? (
							field.multiple ? (
								<Select
									isMulti
									name={field.name}
									options={field.options?.map(opt => ({ value: opt, label: opt }))}
									value={(form[field.name] || []).map(val => ({ value: val, label: val }))}
									onChange={(selectedOptions) => {
										const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
										onChange({ target: { name: field.name, value: values } });
									}}
									className="basic-multi-select text-sm"
									classNamePrefix="select"
									styles={{
										control: (base) => ({
											...base,
											borderRadius: '0.75rem',
											borderColor: '#e5e7eb',
											boxShadow: 'none',
											'&:hover': { borderColor: '#3b82f6' },
											minHeight: '42px',
											fontSize: '14px'
										})
									}}
								/>
							) : (
								<Select
									name={field.name}
									options={field.options?.map(opt => ({ value: opt, label: opt }))}
									value={form[field.name] ? { value: form[field.name], label: form[field.name] } : null}
									onChange={(selectedOption) =>
										onChange({ target: { name: field.name, value: selectedOption ? selectedOption.value : "" } })
									}
									className="basic-single-select text-sm"
									classNamePrefix="select"
									styles={{
										control: (base) => ({
											...base,
											borderRadius: '0.75rem',
											borderColor: '#e5e7eb',
											boxShadow: 'none',
											'&:hover': { borderColor: '#3b82f6' },
											minHeight: '42px',
											fontSize: '14px'
										})
									}}
								/>
							)
						) : field.type === "textarea" ? (
							<textarea
								name={field.name}
								value={form[field.name] !== undefined ? form[field.name] : ""}
								onChange={onChange}
								placeholder={field.placeholder}
								rows="4"
								className="w-full p-3 text-sm border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
							/>

						) : field.type === "date" ? (
							<input
								type="date"
								name={field.name}
								value={
									form[field.name]
										? new Date(form[field.name]).toISOString().split("T")[0]
										: ""
								}
								onChange={readonlyFields.includes(field.name) ? undefined : onChange}
								readOnly={readonlyFields.includes(field.name)}
								className={`w-full p-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${readonlyFields.includes(field.name)
									? "bg-gray-100 text-gray-500 cursor-not-allowed"
									: ""
									}`}
							/>
						) : field.type === "email" ? (
							<input
								type="email"
								name={field.name}
								value={form[field.name] !== undefined ? form[field.name] : ""}
								onChange={readonlyFields.includes(field.name) ? undefined : onChange}
								readOnly={readonlyFields.includes(field.name)}
							
								className={`w-full p-3 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 ${readonlyFields.includes(field.name)
									? "bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200"
									: "border-gray-200"
									}`}
							/>
						) : field.type === "file" ? (
							<input
								type={field.type}
								name={field.name}
								onChange={onChange}
								placeholder={field.placeholder}
								className="w-full p-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
							/>
						) : (
							<input
								type={field.type}
								name={field.name}
								value={form[field.name] !== undefined ? form[field.name] : ""}
								onChange={readonlyFields.includes(field.name) ? undefined : onChange}
								readOnly={readonlyFields.includes(field.name)}
								placeholder={field.placeholder}
								className={`w-full p-3 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 ${readonlyFields.includes(field.name)
									? "bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200"
									: "border-gray-200"
									}`}
							/>
						)}

						{errors && errors[field.name] && (
							<p className="text-red-500 text-xs font-medium flex items-center gap-1">
								<span>*</span>
								{errors[field.name]}
							</p>
						)}
					</div>
				))}
			</div>

			<div className="flex flex-col sm:flex-row gap-3 mt-6">
				{step > 1 && (
					<button
						onClick={handlePrev}
						disabled={isLoading}
						className="w-full sm:w-auto flex-1 py-2.5 px-6 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						← Previous
					</button>
				)}

				<button
					type="submit"
					disabled={isLoading }

					className={`w-full sm:w-auto flex-1 py-2.5 px-6 font-semibold rounded-xl transition-all duration-200 cursor-pointer  ${isLoading 
						? 'bg-gray-300 text-gray-500 cursor-not-allowed'
						: 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
						}`}
				>
					{isLoading ? (
						<span className="flex items-center justify-center gap-2">
							<svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
								<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
								<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
							</svg>
							Processing...
						</span>
					) : submitButtonText}
				</button>

				{onClose && (
					<button
						type="button"
						onClick={onClose}
						disabled={isLoading}
						className="w-full sm:w-auto flex-1 py-2.5 px-6 bg-gray-600 text-white font-semibold rounded-xl hover:bg-gray-700 cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Close
					</button>
				)}
			</div>

			{addSection && (
				<div className="flex flex-col sm:flex-row gap-3 mt-4">
					<button
						type="button"
						onClick={addSection}
						className="w-full sm:w-auto flex-1 py-2.5 px-6 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
					>
						<span className="text-lg leading-none">+</span>
						Add Another
					</button>

					{entriesCount > 1 && deleteSection && (
						<button
							type="button"
							onClick={deleteSection}
							className="w-full sm:w-auto flex-1 py-2.5 px-6 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
						>
							<span className="text-lg leading-none">−</span>
							Delete Entry
						</button>
					)}
				</div>
			)}
		</form>
	);
}

export default ReusableForm;