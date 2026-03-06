import React from 'react'

function ButtonComp({ name, click, disable }) {
	return (
		<button
			type="submit"
			className="bg-blue-600 text-white py-2 px-3 rounded-xl cursor-pointer hover:bg-blue-700 transition w-full"
			onClick={click}
			disabled={disable}
		>
			{name}
		</button>
	)
}

export default ButtonComp