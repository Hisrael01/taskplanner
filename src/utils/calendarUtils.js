export const generateCalendarDays = (year, month) => {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  const calendarDays = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null)
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  return calendarDays
}

export const getTaskPositionInDay = (task, day, month, year) => {
  // Normalize dates to avoid timezone issues
  const dayDate = new Date(year, month, day)
  dayDate.setHours(0, 0, 0, 0)
  
  const taskStart = new Date(task.startDate)
  taskStart.setHours(0, 0, 0, 0)
  
  const taskEnd = new Date(task.endDate)
  taskEnd.setHours(0, 0, 0, 0)

  // Check if this day is within the task's date range
  const isInTask = dayDate >= taskStart && dayDate <= taskEnd

  if (!isInTask) {
    return {
      dayPosition: -1,
      totalDays: 0,
      isInTask: false,
      isFirstDay: false,
      isLastDay: false,
    }
  }

  // Calculate positions 
  const daysDiff = Math.floor((dayDate - taskStart) / (1000 * 60 * 60 * 24))
  const totalDays = Math.floor((taskEnd - taskStart) / (1000 * 60 * 60 * 24)) + 1

  return {
    dayPosition: daysDiff,
    totalDays: totalDays,
    isInTask: true,
    isFirstDay: daysDiff === 0,
    isLastDay: daysDiff === totalDays - 1,
  }
}

export const getTaskColors = (priority, useColorModeValue, priorityColors) => {
  const colors = priorityColors[priority] || priorityColors.low
  return {
    bg: useColorModeValue(colors.light, colors.dark),
    borderColor: colors.border,
    textColor: useColorModeValue(colors.text, "white"),
  }
}