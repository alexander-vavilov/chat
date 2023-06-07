import React, { useContext, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import { Navigate } from 'react-router-dom'

const Form = ({ handleSubmit, type }) => {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { currentUser } = useContext(UserContext)

	const onSubmit = e => {
		e.preventDefault()

		handleSubmit(email, password, username)
	}

	if (currentUser) return <Navigate to='/' />

	return (
		<form
			onSubmit={onSubmit}
			className='flex flex-col gap-3 p-4 max-w-md mx-auto bg-slate-600 rounded-md'
		>
			{type === 'register' && (
				<input
					type='text'
					value={username}
					onChange={e => setUsername(e.target.value)}
					className='px-4 py-1.5 bg-slate-500 rounded-md'
					placeholder='Username'
				/>
			)}
			<input
				type='email'
				value={email}
				onChange={e => setEmail(e.target.value)}
				className='px-4 py-1.5 bg-slate-500 rounded-md'
				placeholder='Email'
			/>
			<input
				type='password'
				value={password}
				onChange={e => setPassword(e.target.value)}
				className='px-4 py-1.5 bg-slate-500 rounded-md'
				placeholder='Password'
			/>
			<button type='submit' className='py-1 bg-slate-700 rounded-md capitalize'>
				{type}
			</button>
		</form>
	)
}

export default Form
