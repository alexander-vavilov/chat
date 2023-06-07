import React from 'react'
import UserBadge from '../UserBadge'
import UserInfoModal from './UserInfoModal'
import BackButton from '../BackButton'
import useModal from '../../hooks/useModal'

const ChatHeader = ({ chatInfo }) => {
	const { isOpen, handleOpen, handleClose } = useModal()

	return (
		<header className='bg-neutral-900 border-b border-neutral-950/10'>
			<div className='flex justify-between items-center gap-4'>
				<div className='flex flex-auto'>
					<BackButton />
					<div onClick={handleOpen} className='flex-auto cursor-pointer'>
						<UserBadge
							displayName={chatInfo.displayName}
							status={chatInfo.status}
						/>
					</div>
				</div>
				<button className='p-3'>smt</button>
				<UserInfoModal
					uid={chatInfo.uid}
					isOpen={isOpen}
					onRequestClose={handleClose}
				/>
			</div>
		</header>
	)
}

export default ChatHeader
