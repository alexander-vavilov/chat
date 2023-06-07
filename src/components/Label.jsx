import React from 'react'

const Label = ({ children }) => {
	return (
		<div className='px-2 py-1 bg-neutral-800 rounded-full text-sm text-neutral-400 select-none'>
			{children}
		</div>
	)
}

export default Label
