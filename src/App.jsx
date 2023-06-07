import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Chat, Login, Register, Saved, Settings } from './pages'
import { UserContext } from './contexts/UserContext'
import Layout from './components/Layout'
import { SidebarContextProvider } from './contexts/SidebarContext'
import Label from './components/Label'

const PrivateRoute = ({ children }) => {
	const { currentUser } = useContext(UserContext)

	if (currentUser === null) return <Navigate to='login' />
	return children
}

const App = () => {
	return (
		<div className='light'>
			<SidebarContextProvider>
				<Routes>
					<Route
						element={
							<PrivateRoute>
								<Layout />
							</PrivateRoute>
						}
					>
						<Route path='/' element={<Navigate to='/chats' />} />
						<Route
							path='/chats'
							element={<Label>Select a chat to start messaging</Label>}
						/>
						<Route path='/chats/:chatId' element={<Chat />} />
						<Route path='/settings' element={<Settings />} />
						<Route path='/saved' element={<Saved />} />
					</Route>
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
				</Routes>
			</SidebarContextProvider>
		</div>
	)
}

export default App
