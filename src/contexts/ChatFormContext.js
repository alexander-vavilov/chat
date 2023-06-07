import React, { createContext, useReducer } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

const ActionTypes = {
	EDIT_MESSAGE: 'EDIT_MESSAGE',
	REPLY_MESSAGE: 'REPLY_MESSAGE',
	FORWARD_MESSAGE: 'FORWARD_MESSAGE',
	ADD_TO_FAVORITES: 'ADD_TO_FAVORITES',
}

const messageReducer = (state, action) => {
	switch (action.type) {
		case ActionTypes.EDIT_MESSAGE:
			return { ...state, editedMessage: action.payload }
		case ActionTypes.REPLY_MESSAGE:
			return { ...state, repliedMessage: action.payload }
		case ActionTypes.FORWARD_MESSAGE:
			return { ...state, forwardedMessage: action.payload }
		default:
			return state
	}
}

export const ChatFormContext = createContext()

export const ChatFormContextProvider = ({ children }) => {
	const { chatId } = useParams()
	const [targetMessage, setTargetMessage] = useState()
	const [state, dispatch] = useReducer(messageReducer, {
		editedMessage: null,
		repliedMessage: null,
		forwardedMessage: null,
	})

	const handleEditMessage = async newMessageText => {
		if (!targetMessage) return

		await updateDoc(doc(db, 'chats', chatId, 'messages', targetMessage.id), {
			text: newMessageText,
		})

		setTargetMessage()
	}

	const handleReplyMessage = () => {
		console.log('reply')
	}

	const value = {
		targetMessage,
		setTargetMessage,
		handleEditMessage,
		state,
		dispatch,
	}

	return (
		<ChatFormContext.Provider value={value}>
			{children}
		</ChatFormContext.Provider>
	)
}

export default ChatFormContext
