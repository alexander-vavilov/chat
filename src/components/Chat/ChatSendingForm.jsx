import React, { useContext, useState } from 'react'
import {
	addDoc,
	collection,
	doc,
	getDoc,
	serverTimestamp,
	setDoc,
	updateDoc,
} from 'firebase/firestore'
import { BiMicrophone, BiSend } from 'react-icons/bi'
import { IoMdAttach, IoMdCheckmark } from 'react-icons/io'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase'
import { UserContext } from '../../contexts/UserContext'
import { MdClose, MdEdit } from 'react-icons/md'
import IconButton from '../IconButton'
import ChatFormContext from '../../contexts/ChatFormContext'

const ChatSendingForm = ({ uid }) => {
	const [message, setMessage] = useState('')
	const { chatId } = useParams()
	const { currentUser } = useContext(UserContext)
	const { targetMessage, setTargetMessage, handleEditMessage } =
		useContext(ChatFormContext)

	const handleSubmit = async () => {
		if (!message) return

		if (targetMessage) {
			return handleEditMessage(message)
		}

		await setGlobalChatMessage()
		await createInterlocutorChat()
		await setLastMessage()

		setMessage('')
	}
	const setGlobalChatMessage = async () => {
		const chatRef = doc(db, 'chats', chatId)
		addDoc(collection(chatRef, 'messages'), {
			text: message,
			uid: currentUser.uid,
			timestamp: serverTimestamp(),
			isRead: false,
		})
	}
	const createInterlocutorChat = async () => {
		const interlocutorChatRef = doc(db, 'users', uid, 'userChats', chatId)
		const interlocutorChatSnap = await getDoc(interlocutorChatRef)
		if (!interlocutorChatSnap.exists()) {
			setDoc(interlocutorChatRef, {
				displayName: currentUser.displayName,
				email: currentUser.email,
				uid: currentUser.uid,
			})
		}
	}
	const setLastMessage = async () => {
		const lastMessage = {
			text: message,
			timestamp: serverTimestamp(),
		}

		const currentUserChatRef = doc(
			db,
			'users',
			currentUser.uid,
			'userChats',
			chatId
		)
		const interlocutorChatRef = doc(db, 'users', uid, 'userChats', chatId)

		await updateDoc(currentUserChatRef, { lastMessage })
		await updateDoc(interlocutorChatRef, { lastMessage })
	}

	const handleKeyDown = e => {
		if (e.key === 'Enter') handleSubmit()
	}

	return (
		<div className='bg-neutral-900'>
			{targetMessage && (
				<div className='flex justify-between items-center px-4 py-2'>
					<div className='flex items-center gap-2 text-neutral-400'>
						<MdEdit size={22} />
						<div className='flex flex-col text-sm'>
							<span className='select-none'>Edit message</span>
							<span className='text-white'>{targetMessage.text}</span>
						</div>
					</div>
					<IconButton onClick={() => setTargetMessage()} icon={MdClose} />
				</div>
			)}
			<div className='flex items-center gap-4'>
				<div className='flex flex-auto'>
					<IconButton icon={IoMdAttach} className='p-3' />
					<input
						type='text'
						value={message}
						onChange={e => setMessage(e.target.value)}
						onKeyDown={handleKeyDown}
						className='w-full py-3 bg-transparent text-sm'
						placeholder='Write a message...'
						autoFocus
					/>
				</div>
				{message.length ? (
					<IconButton
						onClick={handleSubmit}
						icon={targetMessage ? IoMdCheckmark : BiSend}
						className='p-3'
					/>
				) : (
					<IconButton icon={BiMicrophone} className='p-3' />
				)}
			</div>
		</div>
	)
}

export default ChatSendingForm
