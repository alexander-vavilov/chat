import { useEffect, useState } from 'react'

const useScrolling = ref => {
	const [isScrollingEnabled, setIsScrollingEnabled] = useState(true)

	useEffect(() => {
		const handleScrolling = e => {
			if (isScrollingEnabled) return

			e.preventDefault()
			e.stopPropagation()
		}

		const element = ref.current
		element.addEventListener('wheel', handleScrolling)

		return () => element.removeEventListener('wheel', handleScrolling)
	}, [isScrollingEnabled, ref])

	return { isScrollingEnabled, setIsScrollingEnabled }
}

export default useScrolling
