import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'
import IconButton from '../IconButton'

const SidebarSearchInput = ({ handleSearch, setSearchResults }) => {
	const [search, setSearch] = useState('')

	const handleKeyDown = e => {
		if (e.key === 'Escape') {
			setSearch('')
			setSearchResults([])
		}
	}

	useEffect(() => {
		if (!search) setSearchResults([])

		handleSearch(search)
		//eslint-disable-next-line
	}, [search])

	return (
		<div className='flex w-full bg-neutral-700 rounded-md text-sm'>
			<input
				type='text'
				value={search}
				onChange={e => setSearch(e.target.value)}
				onKeyDown={handleKeyDown}
				className='flex-auto px-4 py-1.5 bg-transparent'
				placeholder='Search...'
			/>
			<IconButton
				icon={MdClose}
				onClick={() => setSearch('')}
				className={`${search ? '' : 'scale-0 rotate-45'} px-4`}
			/>
		</div>
	)
}

export default SidebarSearchInput
