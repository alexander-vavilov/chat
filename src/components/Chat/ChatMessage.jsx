import React, { forwardRef, useContext, useRef } from 'react'
import { UserContext } from '../../contexts/UserContext'
import ChatMessageSendTime from './ChatMessageSendTime'
import useContextMenu from '../../hooks/useContextMenu'
import ContextMenu from '../ContextMenu'
import {
	MdOutlineDeleteOutline,
	MdOutlineEdit,
	MdOutlineContentCopy,
	MdOutlinePushPin,
} from 'react-icons/md'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useParams } from 'react-router-dom'
import ChatFormContext from '../../contexts/ChatFormContext'
import { IoCheckmarkDoneSharp } from 'react-icons/io5'

const ChatMessage = forwardRef(function ChatMessage({ message }, messagesRef) {
	const { uid, text, isRead, timestamp, id } = message

	const { chatId } = useParams()
	const { currentUser } = useContext(UserContext)
	const { setTargetMessage } = useContext(ChatFormContext)
	const isMyMessage = uid === currentUser.uid

	const contextMenuRef = useRef(null)
	const { openContextMenu, closeContextMenu, isOpen } = useContextMenu(
		contextMenuRef,
		messagesRef
	)

	const handleCopyText = () => {
		navigator.clipboard.writeText(text)
	}

	const handleDeleteMessage = () => {
		deleteDoc(doc(db, 'chats', chatId, 'messages', id))
	}

	const handleEditMessage = () => {
		if (!isMyMessage) return

		setTargetMessage(message)
	}

	const contextMenuItems = [
		{
			title: 'delete',
			icon: MdOutlineDeleteOutline,
			handler: handleDeleteMessage,
			warning: {
				message: 'Do you want to delete this message?',
				confirmButton: 'delete',
			},
		},
		{
			title: 'edit',
			icon: MdOutlineEdit,
			handler: handleEditMessage,
		},
		{
			title: 'copy text',
			icon: MdOutlineContentCopy,
			handler: handleCopyText,
		},
		{
			title: 'pin',
			icon: MdOutlinePushPin,
			handler: '',
		},
	]

	return (
		<li
			onContextMenu={openContextMenu}
			className={isMyMessage ? 'flex justify-end' : ''}
		>
			<div
				className={`inline-flex gap-2 max-w-2/3 px-3 py-1 ${
					isMyMessage
						? 'bg-neutral-700 rounded-br-none'
						: 'bg-neutral-800 rounded-bl-none'
				} rounded-2xl`}
			>
				<span className='py-0.5 text-sm'>{text}</span>
				<ChatMessageSendTime timestamp={timestamp} />
				{isMyMessage && isRead && (
					<IoCheckmarkDoneSharp className='self-end text-neutral-300' />
				)}
				{isOpen && (
					<ContextMenu
						ref={contextMenuRef}
						items={contextMenuItems}
						closeContextMenu={closeContextMenu}
					/>
				)}
			</div>
		</li>
	)
})

export default ChatMessage
