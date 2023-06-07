import { IoIosChatbubbles, IoIosStar } from 'react-icons/io'
import { IoSettingsSharp } from 'react-icons/io5'

export const sidebarControlsItems = [
	{
		to: '/saved',
		label: 'Saved',
		icon: IoIosStar,
	},
	{
		to: '/chats',
		label: 'Chats',
		icon: IoIosChatbubbles,
	},
	{
		to: '/settings',
		label: 'Settings',
		icon: IoSettingsSharp,
	},
]
