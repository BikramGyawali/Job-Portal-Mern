import React from 'react'

function LoadingComp() {
	return (
		<div className="flex items-center justify-center min-h-screen bg-white">
			<div className="flex flex-col items-center gap-4">

				{/* Spinner */}
				<div className="relative w-16 h-16">
					<div className="absolute inset-0 rounded-full border-4 border-blue-100" />
					<div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
				</div>

				{/* Text */}
				<div className="flex flex-col items-center gap-1">
					<p className="text-blue-600 font-semibold text-lg tracking-wide">
						Loading
					</p>
					<div className="flex gap-1">
						<span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0ms]" />
						<span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:150ms]" />
						<span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:300ms]" />
					</div>
				</div>

			</div>
		</div>

	)
}

export default LoadingComp