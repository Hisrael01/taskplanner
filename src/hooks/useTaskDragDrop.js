import { useState } from "react"

export const useTaskDragDrop = (onTaskMove, onTaskResize) => {
  const [draggedTask, setDraggedTask] = useState(null)
  const [dragType, setDragType] = useState(null) // 'move', 'resize-start', 'resize-end'
  const [isDragging, setIsDragging] = useState(false)

  const startDrag = (task, type = "move") => {
    setDraggedTask(task)
    setDragType(type)
    setIsDragging(true)
  }

  const handleDrop = (day, month, year) => {
    if (!draggedTask) return

    //  Use timezone-safe date formatting
    const formatDateSafe = (date) => {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }

    const dropDate = formatDateSafe(new Date(year, month, day))
    console.log("=== TASK DROP ===")
    console.log("Drop target:", { day, month, year })
    console.log("Formatted drop date:", dropDate)
    console.log("Drag type:", dragType)

    if (dragType === "move") {
      onTaskMove(draggedTask.id, dropDate)
    } else if (dragType === "resize-start") {
      //  Validate dates before resizing
      const endDate = new Date(draggedTask.endDate)
      const newStartDate = new Date(year, month, day)
      
      console.log("Resize start - newStartDate:", newStartDate, "endDate:", endDate)
      
      // Don't allow start date to be after end date
      if (newStartDate <= endDate) {
        onTaskResize(draggedTask.id, dropDate, draggedTask.endDate)
      } else {
        console.log("Invalid resize: start date after end date")
      }
    } else if (dragType === "resize-end") {
      //  Validate dates before resizing
      const startDate = new Date(draggedTask.startDate)
      const newEndDate = new Date(year, month, day)
      
      console.log("Resize end - startDate:", startDate, "newEndDate:", newEndDate)
      
      // Don't allow end date to be before start date
      if (newEndDate >= startDate) {
        onTaskResize(draggedTask.id, draggedTask.startDate, dropDate)
      } else {
        console.log("Invalid resize: end date before start date")
      }
    }

    resetDrag()
  }

  const resetDrag = () => {
    setDraggedTask(null)
    setDragType(null)
    setIsDragging(false)
  }

  // helper to check if currently resizing
  const isResizing = () => {
    return isDragging && (dragType === "resize-start" || dragType === "resize-end")
  }

  return {
    draggedTask,
    dragType,
    isDragging,
    isResizing: isResizing(),
    startDrag,
    handleDrop,
    resetDrag,
  }
}