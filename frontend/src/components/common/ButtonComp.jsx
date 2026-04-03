import React from 'react'

function ButtonComp({ name, click, disable, type = "submit" }) {

	return (
		<button
			type={type}
			className={`bg-blue-600 text-white py-2 px-3 rounded-xl hover:bg-blue-700 transition w-full 
                ${disable
					? 'opacity-50 cursor-not-allowed'
					: 'cursor-pointer'
				}`}
			onClick={click}
			disabled={disable}
		>
			{name}
		</button>
	)

}

export default ButtonComp