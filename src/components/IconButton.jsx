import React from 'react'

const IconButton = ({ icon: Icon, size, className, ...props }) => {
	return (
		<button
			{...props}
			className={`text-neutral-400 hover:text-white/90 transition-all duration-300 ${className}`}
		>
			<Icon size={size || 22} />
		</button>
	)
}

export default IconButton
