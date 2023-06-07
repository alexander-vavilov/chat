import React, { useContext, useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../../firebase'
import { UserContext } from '../../contexts/UserContext'
import SidebarChat from './SidebarChat'

const SidebarChats = () => {
	const { currentUser } = useContext(UserContext)
	const [chats, setChats] = useState([])

	useEffect(() => {
		const q = query(
			collection(db, 'users', currentUser.uid, 'userChats'),
			orderBy('lastMessage.timestamp', 'desc')
		)
		const unsub = onSnapshot(q, snapshot => {
			const chatsArray = []
			snapshot.docs.forEach(doc => {
				chatsArray.push({ id: doc.id, ...doc.data() })
			})
			setChats(chatsArray)
		})

		return () => unsub()

		//eslint-disable-next-line
	}, [])

	return (
		<ul className='flex flex-col divide-y divide-neutral-600/30 md:divide-none'>
			{chats.map(chat => (
				<SidebarChat key={chat.id} chat={chat} />
			))}
		</ul>
	)
}

export default SidebarChats
