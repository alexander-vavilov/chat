import { useEffect, useState } from 'react'

const useObserver = ref => {
	const [isVisible, setIsVisible] = useState(false)

	const handleIntersection = (entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				setIsVisible(true)
				observer.unobserve(entry.target)
			} else {
				setIsVisible(false)
			}
		})
	}
	useEffect(() => {
		const observer = new IntersectionObserver(handleIntersection, {
			threshold: 0.5,
			once: true,
		})

		observer.observe(ref?.current)

		return () => {
			observer.disconnect()
		}

		// eslint-disable-next-line
	}, [])

	return isVisible
}

export default useObserver
