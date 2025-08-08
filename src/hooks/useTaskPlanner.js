import { useState } from 'react'

export const useTaskPlanner = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [tasks, setTasks] = useState([])
  const [filters, setFilters] = useState({
    category: '',
    priority: ''
  })

  // Date utilities
  const formatDate = (date) => {
    return date.toISOString().split('T')[0]
  }

  const isToday = (day, month, year) => {
    const today = new Date()
    return today.getDate() === day && 
           today.getMonth() === month && 
           today.getFullYear() === year
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
  const getTasksForDate = (day) => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const dateStr = formatDate(new Date(year, month, day))
    
    return tasks.filter(task => {
      const matchesDate = task.date === dateStr
      const matchesCategory = !filters.category || task.category === filters.category
      const matchesPriority = !filters.priority || task.priority === filters.priority
      return matchesDate && matchesCategory && matchesPriority
    })
  }

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now().toString(),
      ...taskData
    }
    setTasks(prev => [...prev, newTask])
  }

  const updateTask = (taskId, taskData) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...taskData, id: taskId } : task
    ))
  }

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId))
  }

  const moveTask = (taskId, newDate) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, date: newDate } : task
    ))
  }

  const clearFilters = () => {
    setFilters({ category: '', priority: '' })
  }

  return {
    // State
    currentDate,
    tasks,
    filters,
    
    // Calendar utilities
    formatDate,
    isToday,
    
    // Navigation
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    
    // Task operations
    getTasksForDate,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    
    // Filters
    setFilters,
    clearFilters
  }
}
