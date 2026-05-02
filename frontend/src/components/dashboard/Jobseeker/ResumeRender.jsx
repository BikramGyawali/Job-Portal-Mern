import React from 'react'

function ResumeRender({ sections }) {
	if (!sections) return null;
	return (
		<div className="grid grid-cols-1 gap-5">
			{sections.map((sec, i) => {
				{ sec.data }
				if (!sec.data || (Array.isArray(sec.data) && sec.data.length === 0)) return null;

				return (
					<div className=" p-1" key={i}>

						{sec.section !== 'Personal Header' && (
							<>
								<h1 className='text-[18px] font-semibold'>{sec.section}</h1>
								{/* <hr className='mb-4 border-black border-1' />   */}
								{/* arrow line for the headers */}
							</>
						)}


						{sec.type === 'text' && <p className='text-[16px] text-justify'>{sec.data}</p>}


						{sec.type === 'header' && sec.data && (
							<div className="flex flex-col md:flex-row gap-5">
								{sec.data.profileImage && (
									<img
										src={sec.data.profileImage}
										alt={sec.data.name}
										className="h-30 w-30 sm:w-34 sm:h-34 md:w-38 md:h-38 lg:h-41 lg:w-41 object-cover rounded border-2 border-black p-1"
									/>
								)}
								{/* console.log(sec.data); */}
								<div className="flex flex-col gap-1 justify-center text-[17px] text-justify">
									{sec.data.name && <h1 className='text-[22px] font-bold'>{sec.data.name}</h1>}
									{/* {sec.data.address && <h2>Address: {sec.data.address}</h2>} */}
									{sec.data.email && <h1 >
										Email: {sec.data.email}</h1>}
									{sec.data.contact && <h1 >
										Contact: {sec.data.contact}</h1>}
									{sec.data.dateOfBirth && <h2>Date of Birth: {sec.data.dateOfBirth}</h2>}
									{sec.data.experience && <h2>Experience: {sec.data.experience}</h2>}
									{sec.data.address && <h2>Address : {sec.data.address}</h2>}
								</div>
							</div>
						)}


						{sec.type === 'table' && (
							<>
								{sec.data.map((obj, j) => (
									<div key={j} className="p-1">
										{(obj.startYear || obj.endYear) && (
											<h2 className='text-[16px] font-semibold'>
												{obj.startYear ? obj.startYear : ''} {obj.endYear ? '-' + obj.endYear : ''}
											</h2>
										)}
										<p className='text-[16px] font-semibold'>
											{obj.degree
												? `${obj.degree}${obj.field ? ' - ' + obj.field : ''}${obj.cgpa ? ' (CGPA ' + obj.cgpa + ')' : ''
												}`
												: obj.position
													? `${obj.position}${obj.company ? ' - ' + obj.company : ''}`
													: ''}
										</p>
										<p className='text-[14px]'>
											{obj.institution
												? `${obj.institution}${obj.boardOrUniversity ? ', ' + obj.boardOrUniversity : ''}${obj.location ? ', ' + obj.location : ''
												}`
												: obj.position
													? `${obj.employmentType}${obj.industry ? ' - ' + obj.industry : ''}`
													: obj.language
														? `${obj.language} ,Reading: ${obj.reading}, Writing: ${obj.writing}, Speaking: ${obj.speaking}`
														: obj.company
															? `${obj.designation ? obj.designation + ', ' : ''}${obj.company}, Contact: ${obj.contact}`
															: ''}
										</p>
									</div>
								))}
							</>
						)}


						{sec.type === 'list' && (
							<>
								{sec.data.map((obj, j) => (
									<p key={j} className='text-[16px] ml-[16px] list-disc'>
										{obj.year ? obj.year + ' - ' : ''}
										{obj.title ? obj.title + ' ' : ''}
										{obj.provider ? '(' + obj.provider + ')' : ''}
										{obj.type ? ' [' + obj.type + ']' : ''}
										{obj.platform ? obj.platform + ' - ' + obj.handle : ''}
									</p>
								))}
							</>
						)}

						{/* KeyValue */}
						{sec.type === 'keyValue' && (
							<div className="flex flex-col gap-1 text-[15px]">
								{sec.data.filter(items => items.value !== null
									&& items.value !== undefined && items.value !== ""
								).map((obj, j) => (
										<p key={j}>
											<strong>{obj.label}:</strong> {obj.value}
										</p>
									))}
							</div>
						)}

						{/* Tags */}
						{sec.type === 'tags' && (
							<div className="flex flex-wrap gap-2 mt-1 ">
								{sec.data.map((tag, j) => (
									<span
										key={j}
										className='text-[14px] bg-[#e2e8f0] border-black rounded px-3 py-2 '
									>

										{tag}
									</span>
								))}
							</div>
						)}
					</div>
				);
			})}</div>
	)
}

export default ResumeRender