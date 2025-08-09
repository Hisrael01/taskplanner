import { useState, useCallback, useEffect } from "react"

export const useTaskPlanner = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [tasks, setTasks] = useState([])
  const [filters, setFilters] = useState({
    categories: {
      "To Do": true,
      "In Progress": true,
      Review: true,
      Completed: true,
    },
    timeRange: "",
    searchQuery: "",
  })


  const saveTasksToStorage = useCallback((tasksToSave) => {
    try {
      console.log("Saving tasks to localStorage:", tasksToSave)
      localStorage.setItem("taskplanner-tasks", JSON.stringify(tasksToSave))
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error)
    }
  }, [])

  // Save to localStorage whenever tasks change (with debouncing)
  useEffect(() => {
    if (tasks.length >= 0) { // Changed from > 0 to >= 0 to handle empty arrays
      saveTasksToStorage(tasks)
    }
  }, [tasks, saveTasksToStorage])

  // Date utilities
  const formatDate = (date) => {
    if (!date) return null
    if (typeof date === 'string') return date
    
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const isToday = (day, month, year) => {
    const today = new Date()
    return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year
  }

  const addDays = (date, days) => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  const getDaysBetween = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end - start)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
  }

  // Calendar navigation
  const goToPreviousMonth = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const goToNextMonth = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // Task operations
  const getFilteredTasks = useCallback(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const monthStart = new Date(year, month, 1)
    const monthEnd = new Date(year, month + 1, 0)

    return tasks.filter((task) => {
      // Category filter
      if (!filters.categories[task.category]) return false

      // Search filter
      if (filters.searchQuery && !task.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false
      }

      // Time range filter
      if (filters.timeRange) {
        const today = new Date()
        const taskStart = new Date(task.startDate)
        const taskEnd = new Date(task.endDate)

        let rangeEnd
        switch (filters.timeRange) {
          case "1week":
            rangeEnd = addDays(today, 7)
            break
          case "2weeks":
            rangeEnd = addDays(today, 14)
            break
          case "3weeks":
            rangeEnd = addDays(today, 21)
            break
          default:
            rangeEnd = new Date(2099, 11, 31) // Far future
        }

        if (taskEnd < today || taskStart > rangeEnd) return false
      }

      // Check if task overlaps with current month
      const taskStart = new Date(task.startDate)
      const taskEnd = new Date(task.endDate)

      return taskStart <= monthEnd && taskEnd >= monthStart
    })
  }, [tasks, filters, currentDate])

  const getTasksForDay = useCallback((day) => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const dayDate = new Date(year, month, day)
    dayDate.setHours(0, 0, 0, 0)

    return getFilteredTasks().filter((task) => {
      const taskStart = new Date(task.startDate)
      taskStart.setHours(0, 0, 0, 0)
      const taskEnd = new Date(task.endDate)
      taskEnd.setHours(0, 0, 0, 0)

      return dayDate >= taskStart && dayDate <= taskEnd
    })
  }, [getFilteredTasks, currentDate])

  const addTask = useCallback((taskData) => {
    console.log("=== ADDING TASK ===")
    console.log("Input data:", taskData)
    
    //  Validate required fields
    if (!taskData.name || !taskData.startDate || !taskData.endDate) {
      console.error("Missing required task fields:", taskData)
      return false
    }

    //  Ensure dates are properly formatted
    const startDate = formatDate(taskData.startDate)
    const endDate = formatDate(taskData.endDate)
    
    if (!startDate || !endDate) {
      console.error("Invalid date format:", { startDate, endDate })
      return false
    }

    const newTask = {
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // More unique ID
      name: taskData.name.trim(),
      description: taskData.description || "",
      category: taskData.category || "To Do",
      startDate,
      endDate,
      duration: getDaysBetween(startDate, endDate),
      createdAt: new Date().toISOString(),
    }
    
    console.log("New task object:", newTask)
    
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask]
      console.log("Updated tasks array:", updatedTasks)
      return updatedTasks
    })
    
    return true
  }, [])

  const updateTask = useCallback((taskId, updates) => {
    console.log("Updating task:", taskId, updates)
    
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const updatedTask = { ...task, ...updates }
          if (updates.startDate || updates.endDate) {
            updatedTask.duration = getDaysBetween(
              updates.startDate || task.startDate, 
              updates.endDate || task.endDate
            )
          }
          return updatedTask
        }
        return task
      }),
    )
  }, [])

  const deleteTask = useCallback((taskId) => {
    console.log("Deleting task:", taskId)
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
  }, [])

  const moveTask = useCallback((taskId, newStartDate) => {
    console.log("=== MOVE TASK ===")
    console.log("Task ID:", taskId, "New start date:", newStartDate)
    
    const task = tasks.find((t) => t.id === taskId)
    if (!task) {
      console.log("Task not found:", taskId)
      return
    }

    console.log("Current task:", task)
    console.log("Task duration:", task.duration)

    // Calculate new end date based on duration
    const startDate = new Date(newStartDate)
    const endDate = addDays(startDate, task.duration - 1)

    console.log("Calculated dates:", {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate)
    })

    updateTask(taskId, {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    })
  }, [tasks, updateTask, formatDate, addDays])

  const resizeTask = useCallback((taskId, newStartDate, newEndDate) => {
    console.log("=== RESIZE TASK ===")
    console.log("Task ID:", taskId)
    console.log("New start date:", newStartDate)
    console.log("New end date:", newEndDate)
    
    // Ensure start date is not after end date
    const start = new Date(newStartDate)
    const end = new Date(newEndDate)

    console.log("Date objects:", { start, end })

    if (start > end) {
      console.log("Swapping dates - start was after end")
      // Swap dates if start is after end
      updateTask(taskId, {
        startDate: formatDate(end),
        endDate: formatDate(start),
      })
    } else {
      console.log("Updating task with new dates")
      updateTask(taskId, {
        startDate: newStartDate,
        endDate: newEndDate,
      })
    }
  }, [updateTask, formatDate])

  //  Load tasks from localStorage with better error handling
  const loadTasks = useCallback(() => {
    try {
      const saved = localStorage.getItem("taskplanner-tasks")
      console.log("Raw localStorage data:", saved)
      
      if (saved && saved !== "undefined" && saved !== "null") {
        const parsedTasks = JSON.parse(saved)
        console.log("Loaded tasks from localStorage:", parsedTasks)
        
        // Validate the loaded data
        if (Array.isArray(parsedTasks)) {
          setTasks(parsedTasks)
        } else {
          console.warn("Invalid tasks data in localStorage, resetting...")
          localStorage.removeItem("taskplanner-tasks")
          setTasks([])
        }
      } else {
        console.log("No valid tasks found in localStorage")
        setTasks([])
      }
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error)
      localStorage.removeItem("taskplanner-tasks") // Clear corrupted data
      setTasks([])
    }
  }, [])

  // FIXED: Clear all data (for debugging)
  const clearAllTasks = useCallback(() => {
    console.log("Clearing all tasks...")
    setTasks([])
    localStorage.removeItem("taskplanner-tasks")
  }, [])

  return {
    // State
    currentDate,
    tasks,
    filters,

    // Calendar utilities
    formatDate,
    isToday,
    addDays,
    getDaysBetween,

    // Navigation
    goToPreviousMonth,
    goToNextMonth,
    goToToday,

    // Task operations
    getTasksForDay,
    getFilteredTasks,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    resizeTask,
    loadTasks,
    clearAllTasks, // For debugging

    // Filters
    setFilters,
  }
}