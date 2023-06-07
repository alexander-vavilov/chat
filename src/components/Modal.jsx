import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { MdClose } from 'react-icons/md'
import IconButton from './IconButton'

const Modal = ({ title, children, isOpen, onRequestClose }) => {
	const modalRef = useRef(null)

	useEffect(() => {
		if (!isOpen) return

		const handleClickAway = e => {
			if (!modalRef.current?.contains(e.target)) onRequestClose()
		}

		window.addEventListener('mousedown', handleClickAway)
		return () => window.removeEventListener('mousedown', handleClickAway)
		//eslint-disable-next-line
	}, [isOpen])

	return (
		isOpen &&
		createPortal(
			<div className='absolute top-0 left-0 w-full h-full bg-black/30 z-50'>
				<div
					ref={modalRef}
					className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'
				>
					<div className='p-4 bg-neutral-800 rounded-lg overflow-hidden'>
						{title && (
							<div className='flex justify-between gap-4'>
								<h1 className='text-lg font-medium'>{title}</h1>
								<IconButton icon={MdClose} onClick={onRequestClose} />
							</div>
						)}
						<div>{children}</div>
					</div>
				</div>
			</div>,
			document.getElementById('modal')
		)
	)
}

export default Modal
