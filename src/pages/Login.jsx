import React from 'react'
import Form from '../components/Form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const Login = () => {
	const handleLogin = (email, password) => {
		try {
			signInWithEmailAndPassword(auth, email, password)
		} catch (error) {
			console.error(error)
		}
	}

	return <Form type='login' handleSubmit={handleLogin} />
}

export default Login
