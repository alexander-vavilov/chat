import React, { useContext, useState } from 'react'
import SidebarSearchInput from './SidebarSearchInput'
import SidebarSearchResults from './SidebarSearchResults'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import SidebarChats from './SidebarChats'
import { SidebarContext } from '../../contexts/SidebarContext'
import SidebarControls from './SidebarControls'

const Sidebar = () => {
	const [searchResults, setSearchResults] = useState([])
	const { isOpen } = useContext(SidebarContext)

	const handleSearch = async search => {
		const q = query(
			collection(db, 'users'),
			where('displayName', '==', search.trim().toLowerCase())
		)

		const searchResultsArray = []
		const querySnapshot = await getDocs(q)
		querySnapshot.forEach(doc => {
			searchResultsArray.push({ uid: doc.id, ...doc.data() })
		})
		setSearchResults(searchResultsArray)
	}

	return (
		<aside
			className={`md:max-w-sm fixed md:static ${
				isOpen ? 'left-0' : '-left-full'
			} w-full h-full transition-all duration-300 z-10`}
		>
			<div className='flex flex-col w-full h-full bg-neutral-900'>
				<div className='p-2'>
					<SidebarSearchInput
						handleSearch={handleSearch}
						setSearchResults={setSearchResults}
					/>
				</div>
				<div className='flex-auto'>
					{searchResults.length ? (
						<SidebarSearchResults results={searchResults} />
					) : (
						<SidebarChats />
					)}
				</div>
				<SidebarControls />
			</div>
		</aside>
	)
}

export default Sidebar
