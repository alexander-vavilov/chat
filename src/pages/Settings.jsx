import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebase'

const Settings = () => {
	const handleLogout = () => signOut(auth)

	return (
		<div>
			<span>Settings</span>
		</div>
	)
}

export default Settings
