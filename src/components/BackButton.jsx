import React, { useContext } from 'react'
import { BiChevronLeft } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { SidebarContext } from '../contexts/SidebarContext'

const BackButton = () => {
	const { setIsOpen } = useContext(SidebarContext)

	return (
		<Link
			to='/chats'
			onClick={() => setIsOpen(true)}
			className='flex items-center text-neutral-400 hover:text-white/90 transition-colors duration-300'
		>
			<BiChevronLeft size={30} />
			<span className='md:hidden'>back</span>
		</Link>
	)
}

export default BackButton
