import { onAuthStateChanged } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import Loading from '../components/Loading'

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				setCurrentUser(user)
			} else {
				setCurrentUser(null)
			}

			setLoading(false)
		})
	}, [])

	if (loading) return <Loading />

	const value = {
		currentUser,
		setCurrentUser,
	}

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
