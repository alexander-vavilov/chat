import React from 'react'

const ChatMessageSendTime = ({ timestamp }) => {
	const date = new Date(timestamp?.seconds * 1000)
	const milliseconds = Math.floor(timestamp?.nanoseconds / 1000000)
	date.setMilliseconds(milliseconds)
	const time = date.toLocaleTimeString('en', {
		hour: '2-digit',
		minute: '2-digit',
	})

	return (
		<span className='self-end text-xs text-neutral-400 whitespace-nowrap'>
			{!!timestamp ? time : '--:--'}
		</span>
	)
}

export default ChatMessageSendTime
