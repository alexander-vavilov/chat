import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { SidebarContext } from '../../contexts/SidebarContext'

const SidebarChat = ({ chat }) => {
	const { displayName, lastMessage, status, id } = chat
	const { setIsOpen } = useContext(SidebarContext)

	return (
		<li>
			<Link
				onClick={() => setIsOpen(false)}
				className='flex gap-2 px-3 py-2 hover:bg-neutral-800'
				to={`chats/${id}`}
			>
				<div
					className={`relative w-8 h-8 bg-slate-500 rounded-full ${
						status === 'online' || status === 'typing...'
							? 'before:block'
							: 'before:hidden'
					} before:absolute before:bottom-0 before:right-0 before:w-2 before:h-2 before:bg-white/90 before:rounded-full`}
				/>
				<div className='flex flex-col leading-none'>
					<span className='text-sm font-medium'>{displayName}</span>
					<span className='inline-block text-xs text-neutral-400 line-clamp-1'>
						{lastMessage?.text}
					</span>
				</div>
			</Link>
		</li>
	)
}

export default SidebarChat
