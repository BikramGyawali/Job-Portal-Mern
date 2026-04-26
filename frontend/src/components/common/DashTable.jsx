
import React from "react"
import {
	Table,
	TableHead,
	TableHeadCell,
	TableBody,
	TableRow,
	TableCell,
} from "flowbite-react"
import { BsPen } from "react-icons/bs"
import { MdDeleteForever, MdModeEdit } from "react-icons/md"

function DashTable({ title, headData, bodyData, actionHandler, total, message }) {
	// const isActive = title === "Recent Applications"

	const getActionStyle = (action) => {
		switch (action.toLowerCase()) {
			case "edit":
				return { Icon: MdModeEdit, colorClass: "text-green-400 hover:bg-green-500 hover:text-white" }
			case "delete":
				return { Icon: MdDeleteForever, colorClass: "text-red-400 hover:bg-red-500 hover:text-white" }
			case "view":
				return { Icon: null, colorClass: "text-blue-400 hover:text-blue-700" }
			case "shortlist":
				return { Icon: null, colorClass: "text-green-400 hover:text-green-700" }
			case "approve":
				return { Icon: null, colorClass: "text-green-400 hover:text-green-700" }
			case "reject":
				return { Icon: null, colorClass: "text-red-400 hover:text-red-700" }
			case "apply":
				return { Icon: null, colorClass: "text-green-400 hover:text-green-700" }
			default:
				return { Icon: BsPen, colorClass: "text-gray-400" }
		}
	}

	return (
		<div className="p-4 rounded-2xl shadow-md min-w-full overflow-x-scroll">

			<div className="flex justify-between mb-4">
				<p className="text-[20px] font-semibold">{title}</p>
				<p className={total ? "text-[20px] font-semibold  bg-blue-100  text-blue-600 rounded-2xl p-2 " : "hidden"}>
					Total	{total}
				</p>
			</div>

			<Table>
				<TableHead>
					<TableRow>
						{headData.map((head, i) => (
							<TableHeadCell key={i} className="!text-black !font-bold !bg-blue-300 text-center">
								{head}
							</TableHeadCell>
						))}
					</TableRow>
				</TableHead>

				<TableBody>
					{bodyData.length === 0 ? (
						<TableRow className="!bg-white">
							<TableCell
								colSpan={headData.length}
								className="text-gray-500 text-center py-4 font-medium"
							>
								{message || "No data Available"}
							</TableCell>
						</TableRow>
					) : (
						bodyData.map((row, i) => (
							<TableRow key={i} className="hover:!bg-gray-50">
								{headData.map((key, j) => (
									<TableCell key={j} className="!text-black text-center">

										{key === "S.N" ? (
											i + 1

										) : key === "Actions" ? (
											<div className="flex items-center justify-center gap-2">
												{Array.isArray(row[key]) && row[key].map((action, idx) => {
													const { Icon, colorClass } = getActionStyle(action)
													return (
														<button
															key={idx}
															className={`p-1 cursor-pointer rounded-full ${colorClass}`}
															onClick={() => actionHandler[action]?.(row)}
														>
															{Icon ? <Icon size={20} /> : action}
														</button>
													)
												})}
											</div>

										) : (
											row[key]
										)}

									</TableCell>
								))}
							</TableRow>
						))
					)}
				</TableBody>
			</Table>

		</div>
	)
}

export default DashTable
