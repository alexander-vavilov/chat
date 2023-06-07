import React, { forwardRef } from 'react'
import ContextMenuItems from './ContextMenuItems'

const ContextMenu = forwardRef(function ContextMenu(
	{ items, closeContextMenu },
	ref
) {
	return (
		<div
			ref={ref}
			className='fixed bg-neutral-800 rounded-md overflow-hidden select-none'
		>
			<ContextMenuItems items={items} closeContextMenu={closeContextMenu} />
		</div>
	)
})

export default ContextMenu
