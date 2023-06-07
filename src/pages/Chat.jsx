import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import ChatSendingForm from '../components/Chat/ChatSendingForm'
import ChatMessages from '../components/Chat/ChatMessages'
import ChatHeader from '../components/Chat/ChatHeader'
import { ChatFormContextProvider } from '../contexts/ChatFormContext'

const Chat = () => {
	const { chatId } = useParams()
	const { currentUser } = useContext(UserContext)
	const [chatInfo, setChatInfo] = useState({})
	const navigate = useNavigate()

	useEffect(() => {
		const docRef = doc(db, 'users', currentUser.uid, 'userChats', chatId)
		const unsub = onSnapshot(docRef, snapshot => {
			if (snapshot.exists()) {
				setChatInfo(snapshot.data())
			} else {
				navigate('/chats')
			}
		})

		return () => unsub()
		//eslint-disable-next-line
	}, [currentUser.uid, chatId])

	return (
		<div className='relative flex flex-col w-full h-full border-l border-neutral-950/10'>
			<ChatHeader chatInfo={chatInfo} />
			<ChatFormContextProvider>
				<ChatMessages status={chatInfo.status} />
				<ChatSendingForm uid={chatInfo.uid} />
			</ChatFormContextProvider>
		</div>
	)
}

export default Chat
