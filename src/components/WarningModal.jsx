import React from 'react'
import Modal from './Modal'

const WarningModal = props => {
	const { isOpen, onRequestClose, message, confirm, confirmButtonLabel } = props

	return (
		<Modal isOpen={isOpen} onRequestClose={onRequestClose}>
			<span className='inline-block pb-4'>{message}</span>
			<div className='flex justify-end items-center gap-2'>
				<button
					onClick={onRequestClose}
					className='px-3 py-1 bg-neutral-700 hover:bg-neutral-600 rounded-md capitalize'
				>
					cancel
				</button>
				<button
					onClick={confirm}
					className='px-3 py-1 bg-neutral-700 hover:bg-neutral-600 rounded-md capitalize'
				>
					{confirmButtonLabel}
				</button>
			</div>
		</Modal>
	)
}

export default WarningModal
