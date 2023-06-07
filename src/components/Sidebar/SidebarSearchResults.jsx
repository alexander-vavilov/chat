import React, { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useNavigate } from 'react-router-dom'

const SidebarSearchResults = ({ results }) => {
	const { currentUser } = useContext(UserContext)
	const navigate = useNavigate()

	const handleCreateChat = async user => {
		const chatId =
			currentUser.uid > user.uid
				? currentUser.uid + user.uid
				: user.uid + currentUser.uid

		const chatRef = doc(db, 'chats', chatId)
		const chatSnap = await getDoc(chatRef)

		const userChatRef = doc(db, 'users', currentUser.uid, 'userChats', chatId)
		const userChatSnap = await getDoc(userChatRef)

		if (chatSnap.exists()) {
			if (!userChatSnap.exists()) {
				await setDoc(userChatRef, {
					displayName: user.displayName,
					email: user.email,
					uid: user.uid,
				})
			}
		} else {
			await setDoc(chatRef, { members: [user.uid, currentUser.uid] })
			await setDoc(userChatRef, {
				displayName: user.displayName,
				email: user.email,
				uid: user.uid,
			})
		}

		navigate(`/chats/${chatId}`)
	}

	return (
		<ul>
			{results.map(user => (
				<li
					key={user.uid}
					onClick={() => handleCreateChat(user)}
					className='px-4 py-1.5 hover:bg-slate-600 transition-colors'
				>
					<span>{user.displayName}</span>
					<span>{user.email}</span>
				</li>
			))}
		</ul>
	)
}

export default SidebarSearchResults
