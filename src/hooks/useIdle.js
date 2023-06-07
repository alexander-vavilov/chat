import { useEffect, useState } from 'react'

const useIdle = inactiveTime => {
	const [isActive, setIsActive] = useState(true)

	useEffect(() => {
		let timeoutId

		const handleActivity = () => {
			setIsActive(true)
			clearTimeout(timeoutId)
			timeoutId = setTimeout(() => setIsActive(false), inactiveTime)
		}

		window.addEventListener('mousemove', handleActivity)
		window.addEventListener('keydown', handleActivity)

		return () => {
			window.removeEventListener('mousemove', handleActivity)
			window.removeEventListener('keydown', handleActivity)
			clearTimeout(timeoutId)
		}
	}, [inactiveTime])

	return isActive
}

export default useIdle
