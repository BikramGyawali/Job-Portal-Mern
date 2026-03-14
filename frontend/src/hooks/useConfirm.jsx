import { useState } from 'react'

function useConfirm() {
	const [confirmState, setConfirmState] = useState({
		isOpen: false,
		title: "",
		message: "",
		confirmText: "",
		cancelText: "",
		type: "danger",
		onConfirm: null
	})


	// Pass what to show and what to do on confirm
	const showConfirm = ({ title, message, confirmText, cancelText, type, onConfirm }) => {
		setConfirmState({
			isOpen: true,
			title,
			message,
			confirmText: confirmText || "Confirm",
			cancelText: cancelText || "Cancel",
			type: type || "danger",
			onConfirm
		})
	}

	const handleConfirm = () => {
		if (typeof confirmState.onConfirm === "function") {   // run only if function initially it is null
			confirmState.onConfirm()
		}
		closeConfirm()
	}

	const closeConfirm = () => {
		setConfirmState(prev => (
			{
				...prev,
				isOpen: false,
				onConfirm: null
			}
		))
	}


	const confirmProps = {
		isOpen: confirmState.isOpen,
		title: confirmState.title,
		message: confirmState.message,
		confirmText: confirmState.confirmText,
		cancelText: confirmState.cancelText,
		type: confirmState.type,
		onConfirm: handleConfirm,
		onCancel: closeConfirm
	}

	return { showConfirm, confirmProps }
}

export default useConfirm