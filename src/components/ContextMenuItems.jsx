import React from 'react'
import ContextMenuItem from './ContextMenuItem'

const ContextMenuItems = ({ items, closeContextMenu }) => {
	return (
		<ul className='flex flex-col divide-y divide-neutral-600 '>
			{items.map(({ title, icon, handler, warning }) => (
				<ContextMenuItem
					key={title}
					title={title}
					icon={icon}
					handler={handler}
					warning={warning}
					closeContextMenu={closeContextMenu}
				/>
			))}
		</ul>
	)
}

export default ContextMenuItems
