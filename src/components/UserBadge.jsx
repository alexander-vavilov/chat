import React from 'react'

const UserBadge = ({ displayName, status }) => {
	return (
		<div className='flex flex-col flex-auto p-3 text-center md:text-start'>
			<span className='text-sm capitalize'>{displayName}</span>
			<span className='text-xs text-neutral-400 lowercase'>{status}</span>
		</div>
	)
}

export default UserBadge
