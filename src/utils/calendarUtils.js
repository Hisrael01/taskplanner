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

export const getTaskColors = (priority, useColorModeValue, priorityTaskColors) => {
  const colors = priorityTaskColors[priority]
  return {
    bg: useColorModeValue(colors.light, colors.dark),
    borderColor: colors.border,
    textColor: useColorModeValue(colors.text, 'white')
  }
}
