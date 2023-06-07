import { useEffect, useLayoutEffect, useState } from 'react'
import useScrolling from './useScrolling'

const useContextMenu = (contextMenuRef, scrollingAreaRef) => {
	const [isOpen, setIsOpen] = useState(false)
	const [clickPosition, setClickPosition] = useState({ x: null, y: null })
	const { setIsScrollingEnabled } = useScrolling(scrollingAreaRef)

	const openContextMenu = e => {
		e.preventDefault()

		setClickPosition({ x: e.clientX, y: e.clientY })
		setIsOpen(true)
		setIsScrollingEnabled(false)
	}
	const closeContextMenu = () => {
		setIsOpen(false)
		setIsScrollingEnabled(true)
	}

	const updateContextMenuHorizontalPosition = () => {
		const contextMenuWidth = contextMenuRef.current.offsetWidth
		const shouldMoveLeft =
			contextMenuWidth > window.innerWidth - clickPosition.x

		contextMenuRef.current.style.left = shouldMoveLeft
			? `${clickPosition.x - contextMenuWidth}px`
			: `${clickPosition.x}px`
	}

	const updateContextMenuVerticalPosition = () => {
		const contextMenuHeight = contextMenuRef.current.offsetHeight
		const shouldMoveTop =
			contextMenuHeight > window.innerHeight - clickPosition.y

		contextMenuRef.current.style.top = shouldMoveTop
			? `${clickPosition.y - contextMenuHeight}px`
			: `${clickPosition.y}px`
	}

	const updateContextMenuPosition = () => {
		updateContextMenuHorizontalPosition()
		updateContextMenuVerticalPosition()
	}
	useLayoutEffect(() => {
		if (!isOpen) return

		updateContextMenuPosition()
		// eslint-disable-next-line
	}, [isOpen])

	useEffect(() => {
		if (!isOpen) return

		const handleClickAway = e => {
			const modal = document.getElementById('modal')
			const isMenuContainsClick = contextMenuRef.current?.contains(e.target)
			const isModalContainsClick = modal.contains(e.target)

			if (!isMenuContainsClick && !isModalContainsClick) {
				closeContextMenu()
			}
		}
		const handleEscape = e => {
			if (e.key === 'Escape') closeContextMenu()
		}

		document.addEventListener('mousedown', handleClickAway)
		document.addEventListener('keydown', handleEscape)

		return () => {
			document.removeEventListener('mousedown', handleClickAway)
			document.removeEventListener('keydown', handleEscape)
		}
		// eslint-disable-next-line
	}, [isOpen])

	return { openContextMenu, closeContextMenu, isOpen }
}

export default useContextMenu
