import React from 'react'
import WarningModal from './WarningModal'
import useModal from '../hooks/useModal'

const ContextMenuItem = props => {
	const { title, icon: Icon, handler, closeContextMenu, warning } = props
	const { isOpen, handleOpen, handleClose } = useModal()

	const handleClick = () => {
		if (warning) {
			handleOpen()
		} else {
			handler()
			closeContextMenu()
		}
	}

	return (
		<li
			onClick={handleClick}
			className='flex items-center gap-2 px-3 py-1.5 hover:bg-neutral-600 cursor-pointer'
		>
			<Icon size={20} />
			<span className='whitespace-nowrap'>{title}</span>
			<WarningModal
				isOpen={isOpen}
				onRequestClose={handleClose}
				confirm={handler}
				message={warning?.message}
				confirmButtonLabel={warning?.confirmButton}
			/>
		</li>
	)
}

export default ContextMenuItem
