import React, { useEffect, useState } from 'react'
import Modal from '../Modal'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import UserBadge from '../UserBadge'
import { IoHandRightOutline } from 'react-icons/io5'

const UserInfoModal = ({ uid, isOpen, onRequestClose }) => {
	const [userInfo, setUserInfo] = useState({})

	useEffect(() => {
		if (!uid) return

		const fetchData = async () => {
			const docSnap = await getDoc(doc(db, 'users', uid))
			setUserInfo(docSnap.data())
		}

		fetchData()
	}, [uid])

	return (
		<Modal title='User info' isOpen={isOpen} onRequestClose={onRequestClose}>
			<div className='flex items-center'>
				<div className='w-10 h-10 bg-neutral-500 rounded-full' />
				<UserBadge
					displayName={userInfo.displayName}
					status='last seen recently'
				/>
			</div>
			<hr className='-mx-4 border-t-4 border-neutral-500' />
			<div className='-mx-4'>
				<button className='flex items-center gap-1 w-full p-4 -mb-4 text-red-500 hover:bg-neutral-700'>
					<IoHandRightOutline size={22} />
					<span className='text-sm'>Block user</span>
				</button>
			</div>
		</Modal>
	)
}

export default UserInfoModal
