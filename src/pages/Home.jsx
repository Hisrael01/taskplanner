import { useState } from "react"
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Text,
  Heading,
  IconButton,
  useDisclosure,
  HStack,
  useColorModeValue,
  useBreakpointValue
} from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon, AddIcon } from '@chakra-ui/icons'

// Custom hooks
import { useTaskPlanner } from '@/hooks/useTaskPlanner'
import { useDragAndDrop } from '@/hooks/useDragAndDrop'

// Components
import { TaskModal } from '@/components/TaskModal'
import { TaskListModal } from '@/components/TaskListModal'
import { TaskIndicators } from '@/components/TaskIndicators'
import { FilterSection } from '@/components/FilterSection'

// Utils and constants
import { generateCalendarDays, getTaskColors } from '@/utils/calendarUtils'
import { CATEGORIES, MONTH_NAMES, DAY_NAMES, PRIORITY_TASK_COLORS } from '@/constants/taskConstants'

export default function TaskPlanner() {
  // Custom hooks
  const taskPlanner = useTaskPlanner()
  const dragAndDrop = useDragAndDrop(taskPlanner.moveTask)

  // Modal states
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isTaskListOpen, onOpen: onTaskListOpen, onClose: onTaskListClose } = useDisclosure()
  
  // Local states
  const [selectedDate, setSelectedDate] = useState('')
  const [editingTask, setEditingTask] = useState(null)
  const [selectedTasksForDay, setSelectedTasksForDay] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium'
  })

  // Responsive values
  const isMobile = useBreakpointValue({ base: true, md: false })
  const calendarHeight = useBreakpointValue({ base: "80px", md: "120px" })

  // Color mode values
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const textColor = useColorModeValue('gray.900', 'white')
  const mutedTextColor = useColorModeValue('gray.500', 'gray.400')
  const hoverBg = useColorModeValue('gray.50', 'gray.700')

  // Calendar data
  const year = taskPlanner.currentDate.getFullYear()
  const month = taskPlanner.currentDate.getMonth()
  const calendarDays = generateCalendarDays(year, month)

  // Event handlers
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      priority: 'medium'
    })
    setEditingTask(null)
  }

  const openCreateDialog = (day) => {
    const dateStr = taskPlanner.formatDate(new Date(year, month, day))
    setSelectedDate(dateStr)
    resetForm()
    onOpen()
  }

  const handleDayClick = (day) => {
    if (isMobile) {
      const dayTasks = taskPlanner.getTasksForDate(day)
      if (dayTasks.length > 0) {
        setSelectedTasksForDay(dayTasks)
        onTaskListOpen()
        return
      }
    }
    openCreateDialog(day)
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setFormData({
      title: task.title,
      description: task.description,
      category: task.category,
      priority: task.priority
    })
    onOpen()
  }

  const handleSaveTask = () => {
    if (!formData.title.trim()) return

    const taskData = {
      ...formData,
      date: selectedDate,
      color: CATEGORIES.find(cat => cat.name === formData.category)?.color || 'gray'
    }

    if (editingTask) {
      taskPlanner.updateTask(editingTask.id, taskData)
    } else {
      taskPlanner.addTask(taskData)
    }

    resetForm()
    onClose()
  }

  const handleDeleteTask = () => {
    if (editingTask) {
      taskPlanner.deleteTask(editingTask.id)
      onClose()
    }
  }

  // Drag handlers with calendar context
  const dragHandlers = {
    ...dragAndDrop,
    handleDrop: (e, day) => dragAndDrop.handleDrop(e, day, month, year),
    handleTouchEnd: (e) => dragAndDrop.handleTouchEnd(e, month, year)
  }

  return (
    <Box minH="100vh" bg={bgColor} p={4} pt="100px">
      <Box maxW="7xl" mx="auto">
        {/* Filter Section */}
        <FilterSection
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filters={taskPlanner.filters}
          setFilters={taskPlanner.setFilters}
          onClearFilters={taskPlanner.clearFilters}
        />

        {/* Calendar Navigation */}
        <Flex align="center" justify="space-between" mb={6}>
          <IconButton
            onClick={taskPlanner.goToPreviousMonth}
            variant="outline"
            size="sm"
            icon={<ChevronLeftIcon />}
            aria-label="Previous month"
          />
          
          <HStack spacing={4}>
            <Button onClick={taskPlanner.goToToday} variant="outline" size="sm">
              Today
            </Button>
            <Heading size={{ base: "sm", md: "md" }} color={textColor}>
              {MONTH_NAMES[month]} {year}
            </Heading>
          </HStack>
          
          <IconButton
            onClick={taskPlanner.goToNextMonth}
            variant="outline"
            size="sm"
            icon={<ChevronRightIcon />}
            aria-label="Next month"
          />
        </Flex>

        {/* Calendar Grid */}
        <Box bg={cardBg} rounded="lg" shadow="sm" overflow="hidden" border="1px" borderColor={borderColor}>
          {/* Day headers */}
          <Grid templateColumns="repeat(7, 1fr)" borderBottom="1px" borderColor={borderColor}>
            {DAY_NAMES.map(day => (
              <GridItem key={day} p={{ base: 2, md: 3 }} textAlign="center">
                <Text fontSize="sm" fontWeight="medium" color={mutedTextColor}>
                  {isMobile ? day.slice(0, 1) : day}
                </Text>
              </GridItem>
            ))}
          </Grid>

          {/* Calendar days */}
          <Grid templateColumns="repeat(7, 1fr)">
            {calendarDays.map((day, index) => (
              <GridItem
                key={index}
                minH={calendarHeight}
                borderRight="1px"
                borderBottom="1px"
                borderColor={borderColor}
                p={{ base: 1, md: 2 }}
                position="relative"
                bg={day ? 'transparent' : useColorModeValue('gray.100', 'gray.800')}
                _hover={day ? { bg: hoverBg } : {}}
                cursor={day ? 'pointer' : 'default'}
                onDragOver={day ? dragHandlers.handleDragOver : undefined}
                onDrop={day ? (e) => dragHandlers.handleDrop(e, day) : undefined}
                onClick={day ? () => handleDayClick(day) : undefined}
                data-day={day || undefined}
              >
                {day && (
                  <>
                    <Text
                      fontSize={{ base: "xs", md: "sm" }}
                      mb={1}
                      color={taskPlanner.isToday(day, month, year) ? 'blue.400' : textColor}
                      fontWeight={taskPlanner.isToday(day, month, year) ? 'bold' : 'medium'}
                      textAlign={{ base: "center", md: "left" }}
                    >
                      {day}
                      {taskPlanner.isToday(day, month, year) && !isMobile && (
                        <Box
                          position="absolute"
                          top={1}
                          left={1}
                          w={6}
                          h={6}
                          bg="blue.600"
                          rounded="full"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          color="white"
                          fontSize="xs"
                        >
                          {day}
                        </Box>
                      )}
                    </Text>
                    
                    <TaskIndicators 
                      tasks={taskPlanner.getTasksForDate(day)} 
                      day={day}
                      onTaskEdit={handleEditTask}
                      dragHandlers={dragHandlers}
                      isDragging={dragAndDrop.isDragging}
                      draggedTask={dragAndDrop.draggedTask}
                    />
                    
                    {!isMobile && (
                      <IconButton
                        size="xs"
                        variant="ghost"
                        position="absolute"
                        bottom={1}
                        right={1}
                        icon={<AddIcon />}
                        aria-label="Add task"
                        opacity={0}
                        _groupHover={{ opacity: 1 }}
                        _hover={{ opacity: 1 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          openCreateDialog(day)
                        }}
                      />
                    )}
                  </>
                )}
              </GridItem>
            ))}
          </Grid>
        </Box>

        {/* Modals */}
        <TaskListModal
          isOpen={isTaskListOpen}
          onClose={onTaskListClose}
          tasks={selectedTasksForDay}
          onTaskEdit={handleEditTask}
        />

        <TaskModal
          isOpen={isOpen}
          onClose={onClose}
          formData={formData}
          setFormData={setFormData}
          editingTask={editingTask}
          onSave={handleSaveTask}
          onDelete={handleDeleteTask}
        />

        {/* Drag Preview for Touch Devices */}
        {dragAndDrop.dragPreview && (
          <Box
            position="fixed"
            top={0}
            left={0}
            pointerEvents="none"
            zIndex={9999}
            transform={`translate(${dragAndDrop.dragPreview.x - 50}px, ${dragAndDrop.dragPreview.y - 20}px)`}
          >
            <Box
              p={2}
              rounded="md"
              bg={getTaskColors(dragAndDrop.dragPreview.task.priority, useColorModeValue, PRIORITY_TASK_COLORS).bg}
              border="1px"
              borderColor={getTaskColors(dragAndDrop.dragPreview.task.priority, useColorModeValue, PRIORITY_TASK_COLORS).borderColor}
              borderLeftWidth="3px"
              shadow="lg"
              opacity={0.8}
              fontSize="xs"
            >
              <HStack spacing={1}>
                <Box w={2} h={2} rounded="full" bg={`${dragAndDrop.dragPreview.task.color}.500`} />
                <Text fontWeight="bold" noOfLines={1}>
                  {dragAndDrop.dragPreview.task.title}
                </Text>
              </HStack>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}
