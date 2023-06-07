import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
	return (
		<div className='flex h-d-screen'>
			<Sidebar />
			<main className='flex flex-auto justify-center items-center bg-neutral-950'>
				<Outlet />
			</main>
		</div>
	)
}

export default Layout
