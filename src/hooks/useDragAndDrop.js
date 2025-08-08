import { useState } from 'react'
import { useBreakpointValue } from '@chakra-ui/react'

export const useDragAndDrop = (onTaskMove) => {
  const [draggedTask, setDraggedTask] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [touchStartPos, setTouchStartPos] = useState(null)
  const [dragPreview, setDragPreview] = useState(null)
  
  const isMobile = useBreakpointValue({ base: true, md: false })

  // Desktop drag handlers
  const handleDragStart = (e, task) => {
    setDraggedTask(task)
    setIsDragging(true)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, day, month, year) => {
    e.preventDefault()
    if (!draggedTask) return

    const newDate = new Date(year, month, day).toISOString().split('T')[0]
    onTaskMove(draggedTask.id, newDate)
    
    setDraggedTask(null)
    setIsDragging(false)
  }

  // Touch handlers for mobile
  const handleTouchStart = (e, task) => {
    const touch = e.touches[0]
    setTouchStartPos({ x: touch.clientX, y: touch.clientY })
    setDraggedTask(task)
    setIsDragging(true)
    
    setDragPreview({
      task,
      x: touch.clientX,
      y: touch.clientY
    })
  }

  const handleTouchMove = (e) => {
    if (!draggedTask || !touchStartPos) return
    
    e.preventDefault()
    const touch = e.touches[0]
    
    setDragPreview({
      task: draggedTask,
      x: touch.clientX,
      y: touch.clientY
    })
  }

  const handleTouchEnd = (e, month, year) => {
    if (!draggedTask) return
    
    const touch = e.changedTouches[0]
    const element = document.elementFromPoint(touch.clientX, touch.clientY)
    const dayElement = element?.closest('[data-day]')
    
    if (dayElement) {
      const day = parseInt(dayElement.getAttribute('data-day'))
      if (day) {
        const newDate = new Date(year, month, day).toISOString().split('T')[0]
        onTaskMove(draggedTask.id, newDate)
      }
    }
    
    resetDragState()
  }

  const resetDragState = () => {
    setDraggedTask(null)
    setIsDragging(false)
    setTouchStartPos(null)
    setDragPreview(null)
  }

  return {
    draggedTask,
    isDragging,
    dragPreview,
    isMobile,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    resetDragState
  }
}
