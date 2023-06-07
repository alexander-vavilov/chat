import { createContext, useState } from 'react'

export const SidebarContext = createContext()

export const SidebarContextProvider = ({ children }) => {
	const [isOpen, setIsOpen] = useState(true)

	return (
		<SidebarContext.Provider value={{ isOpen, setIsOpen }}>
			{children}
		</SidebarContext.Provider>
	)
}
