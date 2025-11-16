import React from 'react'

function ButtonComp({ name }) {
	return (
		<button
			type="submit"
			className="bg-blue-600 text-white py-2 rounded-xl cursor-pointer hover:bg-blue-700 transition w-full"
		>
			{name}
		</button>
	)
}

export default ButtonComp