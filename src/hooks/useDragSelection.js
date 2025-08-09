import { useState, useCallback } from 'react'

export const useDragSelection = (onSelectionComplete) => {
  const [isSelecting, setIsSelecting] = useState(false)
  const [selectionStart, setSelectionStart] = useState(null)
  const [selectionEnd, setSelectionEnd] = useState(null)
  const [selectedDays, setSelectedDays] = useState([])

  //  Timezone-safe date formatting
  const formatDateSafe = useCallback((date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }, [])

  const startSelection = useCallback((day, month, year) => {
    console.log("=== DRAG SELECTION START ===")
    console.log("Starting selection on:", { day, month, year })
    
    setIsSelecting(true)
    const startDate = new Date(year, month, day)
    setSelectionStart(startDate)
    setSelectionEnd(startDate)
    setSelectedDays([startDate])
  }, [])

  const updateSelection = useCallback((day, month, year) => {
    if (!isSelecting || !selectionStart) return

    console.log("Updating selection to:", { day, month, year })
    
    const currentDate = new Date(year, month, day)
    setSelectionEnd(currentDate)

    // Calculate all days between start and current
    const start = new Date(Math.min(selectionStart, currentDate))
    const end = new Date(Math.max(selectionStart, currentDate))
    
    const days = []
    const current = new Date(start)
    
    while (current <= end) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }
    
    console.log("Selected days:", days)
    setSelectedDays(days)
  }, [isSelecting, selectionStart])

  const endSelection = useCallback(() => {
    if (!isSelecting || selectedDays.length === 0) {
      resetSelection()
      return
    }

    console.log("=== DRAG SELECTION END ===")
    console.log("Final selected days:", selectedDays)

    // Only create task if we have a valid selection
    if (selectedDays.length > 0) {
      // Sort days to ensure correct order
      const sortedDays = [...selectedDays].sort((a, b) => a.getTime() - b.getTime())
      const startDate = sortedDays[0]
      const endDate = sortedDays[sortedDays.length - 1]
      
      const selectionData = {
        startDay: startDate.getDate(),
        endDay: endDate.getDate(),
        startDate: startDate, // Pass Date objects, let TaskCreationModal format them
        endDate: endDate,     // Pass Date objects, let TaskCreationModal format them
        duration: sortedDays.length,
        selectedDays: sortedDays
      }

      console.log("Selection data being passed:", selectionData)
      
      onSelectionComplete(selectionData)
    }
    
    resetSelection()
  }, [isSelecting, selectedDays, onSelectionComplete, formatDateSafe])

  const resetSelection = useCallback(() => {
    console.log("Resetting selection")
    setIsSelecting(false)
    setSelectionStart(null)
    setSelectionEnd(null)
    setSelectedDays([])
  }, [])

  const isDaySelected = useCallback((day, month, year) => {
    const dayDate = new Date(year, month, day)
    return selectedDays.some(selectedDay => 
      selectedDay.getTime() === dayDate.getTime()
    )
  }, [selectedDays])

  return {
    isSelecting,
    selectedDays,
    startSelection,
    updateSelection,
    endSelection,
    resetSelection,
    isDaySelected
  }
}