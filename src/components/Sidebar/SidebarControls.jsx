import React, { useContext } from 'react'
import { sidebarControlsItems } from '../../consts'
import { NavLink } from 'react-router-dom'
import { SidebarContext } from '../../contexts/SidebarContext'

const SidebarControls = () => {
	const { setIsOpen } = useContext(SidebarContext)

	return (
		<div className='flex bg-neutral-800'>
			{sidebarControlsItems.map(({ to, label, icon: Icon }) => (
				<NavLink
					key={to}
					to={to}
					onClick={() => setIsOpen(false)}
					draggable={false}
					className={({ isActive }) =>
						`flex flex-col flex-auto items-center py-2 hover:bg-neutral-700 ${
							isActive ? '' : 'opacity-50'
						}`
					}
				>
					<Icon size={24} />
					<span className='text-xs'>{label}</span>
				</NavLink>
			))}
		</div>
	)
}

export default SidebarControls
