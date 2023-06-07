import React from 'react'
import Form from '../components/Form'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'

const Register = () => {
	const handleRegister = async (email, password, username) => {
		try {
			const { user } = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
			await updateProfile(user, { displayName: username })

			setDoc(doc(db, 'users', user.uid), {
				email: user.email,
				photoURl: user.photoURL,
				displayName: user.displayName,
			})
		} catch (error) {
			console.error(error)
		}
	}

	return <Form type='register' handleSubmit={handleRegister} />
}

export default Register
