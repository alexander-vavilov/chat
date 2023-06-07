import React, { useEffect, useRef, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../../firebase'
import { useParams } from 'react-router-dom'
import ChatMessage from './ChatMessage'
// import { BiChevronDown } from 'react-icons/bi'

const ChatMessages = ({ status }) => {
	const { chatId } = useParams()
	const [messages, setMessages] = useState([])
	const messagesRef = useRef(null)

	useEffect(() => {
		const q = query(
			collection(db, 'chats', chatId, 'messages'),
			orderBy('timestamp')
		)
		const unsub = onSnapshot(q, snapshot => {
			const messagesArray = []
			snapshot.docs.forEach(doc =>
				messagesArray.push({ id: doc.id, ...doc.data() })
			)
			setMessages(messagesArray)
		})

		return () => unsub()
	}, [chatId])

	return (
		<div ref={messagesRef} className='flex-auto p-3 overflow-auto'>
			<ul className='flex flex-col justify-end gap-2 min-h-full'>
				{messages.map(message => (
					<ChatMessage key={message.id} message={message} ref={messagesRef} />
				))}
			</ul>
			{/* <button className='fixed bottom-20 right-10 p-2 bg-neutral-800 rounded-full'>
					<BiChevronDown size={24} />
				</button> */}
		</div>
	)
}

export default ChatMessages
