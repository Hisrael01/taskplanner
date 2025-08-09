
//working -debug

// import { useState, useEffect } from "react"
// import {
//   Box,
//   Button,
//   Flex,
//   Grid,
//   GridItem,
//   Text,
//   Heading,
//   IconButton,
//   useDisclosure,
//   HStack,
//   useColorModeValue,
//   useBreakpointValue,
//   Alert,
//   AlertIcon,
// } from "@chakra-ui/react"
// import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"

// // Custom hooks
// import { useTaskPlanner } from "@/hooks/useTaskPlanner"
// import { useDragSelection } from "@/hooks/useDragSelection"
// import { useTaskDragDrop } from "@/hooks/useTaskDragDrop"

// // Components
// import { TaskCreationModal } from "@/components/TaskCreationModal"
// import { TaskEditModal } from "@/components/TaskEditModal"
// import { TaskBar } from "@/components/TaskBar"
// import { TaskIndicators } from "@/components/TaskIndicators"
// import { FilterPanel } from "@/components/FilterPanel"
// import { FilterModal } from "@/components/FilterModal"

// // Utils and constants
// import { generateCalendarDays, getTaskPositionInDay } from "@/utils/calendarUtils"
// import { MONTH_NAMES, DAY_NAMES } from "@/constants/taskConstants"

// export default function TaskPlanner() {
//   // Custom hooks
//   const taskPlanner = useTaskPlanner()
//   const dragSelection = useDragSelection((selectionData) => {
//     console.log("=== DRAG SELECTION COMPLETED ===")
//     console.log("Selection data:", selectionData)
//     setSelectionData(selectionData)
//     onCreateModalOpen()
//   })
//   const taskDragDrop = useTaskDragDrop(taskPlanner.moveTask, taskPlanner.resizeTask)

//   // Modal states
//   const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onClose: onCreateModalClose } = useDisclosure()
//   const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure()
//   const { isOpen: isFilterModalOpen, onOpen: onFilterModalOpen, onClose: onFilterModalClose } = useDisclosure()

//   const [selectionData, setSelectionData] = useState(null)
//   const [editingTask, setEditingTask] = useState(null)
//   const [isDraggingTask, setIsDraggingTask] = useState(false)
//   const [isResizing, setIsResizing] = useState(false)

//   // Responsive values
//   const isMobile = useBreakpointValue({ base: true, lg: false })
//   const showFilterPanel = useBreakpointValue({ base: false, lg: true })

//   // Color mode values
//   const bgColor = useColorModeValue("gray.50", "gray.900")
//   const cardBg = useColorModeValue("white", "gray.800")
//   const borderColor = useColorModeValue("gray.200", "gray.600")
//   const textColor = useColorModeValue("gray.900", "white")
//   const mutedTextColor = useColorModeValue("gray.500", "gray.400")
//   const hoverBg = useColorModeValue("gray.50", "gray.700")
//   const selectionBg = useColorModeValue("blue.100", "blue.800")

//   // Calendar data
//   const year = taskPlanner.currentDate.getFullYear()
//   const month = taskPlanner.currentDate.getMonth()
//   const calendarDays = generateCalendarDays(year, month)

//   // Load tasks on mount
//   useEffect(() => {
//     console.log("=== COMPONENT MOUNTED ===")
//     taskPlanner.loadTasks()
//   }, [])

//   // Debug: Log tasks whenever they change
//   useEffect(() => {
//     console.log("=== TASKS CHANGED ===")
//     console.log("Current tasks:", taskPlanner.tasks)
//     console.log("Tasks count:", taskPlanner.tasks.length)
//   }, [taskPlanner.tasks])

//   // Event handlers
//   const handleMouseDown = (day, e) => {
//     if (!day) return

//     // Check if we clicked on a task element or resize handle
//     const taskElement = e.target.closest("[data-task-id]")
//     const resizeHandle = e.target.closest('[draggable="true"]')

//     if (taskElement || resizeHandle) {
//       setIsDraggingTask(true)
//       return // Don't start selection if clicking on a task or resize handle
//     }

//     // Only start selection if clicking on empty space
//     console.log("Starting drag selection on day:", day)
//     dragSelection.startSelection(day, month, year)
//   }

//   const handleMouseEnter = (day, e) => {
//     if (!day || !dragSelection.isSelecting || isDraggingTask) return

//     // Don't update selection if hovering over a task or if dragging a task
//     const taskElement = e.target.closest("[data-task-id]")
//     if (taskElement) {
//       return
//     }

//     dragSelection.updateSelection(day, month, year)
//   }

//   const handleMouseUp = (e) => {
//     if (isDraggingTask || isResizing) {
//       setIsDraggingTask(false)
//       setIsResizing(false)
//       taskDragDrop.resetDrag()
//       return
//     }

//     if (dragSelection.isSelecting) {
//       // Check if we have any selected days and no tasks were clicked
//       const taskElement = e.target.closest("[data-task-id]")
//       if (!taskElement && dragSelection.selectedDays.length > 0) {
//         dragSelection.endSelection()
//       } else {
//         // Cancel selection if we clicked on a task
//         dragSelection.resetSelection()
//       }
//     }
//   }

//   const handleDayClick = (day, e) => {
//     console.log("=== DAY CLICKED ===")
//     console.log("Day:", day, "Month:", month, "Year:", year)
//     console.log("isDragging:", isDraggingTask, "isResizing:", isResizing)
    
//     if (!day || isDraggingTask || isResizing) return

//     // Check if we clicked on a task
//     const taskElement = e.target.closest("[data-task-id]")
//     if (taskElement) {
//       console.log("Clicked on task element, returning")
//       return // Let the task handle its own click
//     }

//     // Only handle day clicks if we're not in the middle of a drag selection
//     if (dragSelection.isSelecting) {
//       console.log("Currently selecting, returning")
//       return
//     }

//     // Check for tasks on this day properly
//     const tasksOnDay = taskPlanner.getTasksForDay(day)
//     console.log("Tasks on day", day, ":", tasksOnDay)
    
//     if (tasksOnDay.length === 0) {
//       // FIXED: Create proper date objects for single day selection
//       const clickedDate = new Date(year, month, day)
//       console.log("Created date object:", clickedDate)
//       console.log("Date components - Year:", year, "Month:", month, "Day:", day)
      
//       const newSelectionData = {
//         startDay: day,
//         endDay: day,
//         startDate: clickedDate,
//         endDate: clickedDate,
//         duration: 1
//       }
//       console.log("Setting selection data:", newSelectionData)
//       setSelectionData(newSelectionData)
//       console.log("Opening create modal")
//       onCreateModalOpen()
//     } else {
//       // If there are tasks, edit the first one
//       console.log("Opening edit modal for task:", tasksOnDay[0])
//       handleTaskClick(tasksOnDay[0])
//     }
//   }

//   const handleDragOver = (e) => {
//     e.preventDefault()
//     e.dataTransfer.dropEffect = "move"
//   }

//   const handleDrop = (e, day) => {
//     e.preventDefault()

//     // Handle the consistent resize format
//     const dragData = e.dataTransfer.getData("text/plain")
//     if (dragData.includes("-resize-")) {
//       const [taskId, , operation] = dragData.split("-")
//       const task = taskPlanner.tasks.find((t) => t.id === taskId)
//       if (task) {
//         const dropDate = new Date(year, month, day).toISOString().split("T")[0]
//         if (operation === "start") {
//           // Only resize if new start date is before end date
//           const endDate = new Date(task.endDate)
//           const newStartDate = new Date(year, month, day)
//           if (newStartDate <= endDate) {
//             taskPlanner.resizeTask(taskId, dropDate, task.endDate)
//           }
//         } else if (operation === "end") {
//           // Only resize if new end date is after start date
//           const startDate = new Date(task.startDate)
//           const newEndDate = new Date(year, month, day)
//           if (newEndDate >= startDate) {
//             taskPlanner.resizeTask(taskId, task.startDate, dropDate)
//           }
//         }
//       }
//     } else if (taskDragDrop.isDragging) {
//       taskDragDrop.handleDrop(day, month, year)
//     }

//     setIsDraggingTask(false)
//     setIsResizing(false)
//   }

//   const handleCreateTask = (taskData) => {
//     console.log("=== HANDLE CREATE TASK ===")
//     console.log("Task data received:", taskData)
    
//     const success = taskPlanner.addTask(taskData)
//     console.log("Task creation success:", success)
    
//     if (success) {
//       console.log("Closing create modal")
//       onCreateModalClose()
//       // Clear selection data
//       setSelectionData(null)
//     } else {
//       console.error("Failed to create task")
//       // Could show an error message here
//     }
//   }

//   const handleTaskClick = (task) => {
//     console.log("=== TASK CLICKED ===")
//     console.log("Task:", task, "isDragging:", isDraggingTask, "isResizing:", isResizing)
    
//     if (!isDraggingTask && !isResizing) {
//       setEditingTask(task)
//       onEditModalOpen()
//     }
//   }

//   const handleTaskDragStart = (task, type) => {
//     setIsDraggingTask(true)
//     // Properly set resize state
//     if (type === 'resize-start' || type === 'resize-end') {
//       setIsResizing(true)
//     }
//     taskDragDrop.startDrag(task, type)
//   }

//   const handleUpdateTask = (taskId, updates) => {
//     taskPlanner.updateTask(taskId, updates)
//   }

//   const handleDeleteTask = (taskId) => {
//     taskPlanner.deleteTask(taskId)
//   }

//   const dayBackgroundColor = (day) => {
//     return day
//       ? dragSelection.isDaySelected(day, month, year)
//         ? selectionBg
//         : "transparent"
//       : useColorModeValue("gray.100", "gray.800")
//   }

//   return (
//     <Flex minH="100vh" bg={bgColor} pt="100px">
//       {/* Debug Panel */}
//       <Box position="fixed" top="0" right="0" bg="red.500" color="white" p={2} zIndex={1000} fontSize="xs">
//         <Text>Tasks: {taskPlanner.tasks.length}</Text>
//         <Button size="xs" onClick={taskPlanner.clearAllTasks} mt={1}>
//           Clear All
//         </Button>
//       </Box>

//       {/* Filter Panel - Desktop */}
//       {showFilterPanel && (
//         <Box p={4} w="320px" flexShrink={0}>
//           <FilterPanel filters={taskPlanner.filters} onFiltersChange={taskPlanner.setFilters} />
//         </Box>
//       )}

//       {/* Main Calendar */}
//       <Box flex={1} p={4}>
//         <Box maxW="7xl" mx="auto">
//           {/* Header with Filter Button for Mobile */}
//           <Flex align="center" justify="space-between" mb={4}>
//             {!showFilterPanel && (
//               <Button
//                 onClick={onFilterModalOpen}
//                 variant="outline"
//                 size="sm"
//                 leftIcon={<Box className="w-4 h-4 bg-transparent">🔍</Box>}
//               >
//                 Filters
//               </Button>
//             )}
//           </Flex>

//           {/* Calendar Navigation */}
//           <Flex align="center" justify="space-between" mb={6}>
//             <IconButton
//               onClick={taskPlanner.goToPreviousMonth}
//               variant="outline"
//               size="sm"
//               icon={<ChevronLeftIcon />}
//               aria-label="Previous month"
//             />

//             <HStack spacing={4}>
//               <Button onClick={taskPlanner.goToToday} variant="outline" size="sm">
//                 Today
//               </Button>
//               <Heading size={{ base: "sm", md: "md" }} color={textColor}>
//                 {MONTH_NAMES[month]} {year}
//               </Heading>
//             </HStack>

//             <IconButton
//               onClick={taskPlanner.goToNextMonth}
//               variant="outline"
//               size="sm"
//               icon={<ChevronRightIcon />}
//               aria-label="Next month"
//             />
//           </Flex>

//           {/* Instructions */}
//           <Text fontSize="sm" color={mutedTextColor} mb={4} textAlign="center">
//             Hold and drag across empty days to create a task • Click tasks to edit • Drag tasks to move • Drag resize bars to extend duration
//           </Text>

//           {/* Debug Info */}
//           {taskPlanner.tasks.length === 0 && (
//             <Alert status="info" mb={4}>
//               <AlertIcon />
//               No tasks found. Click on empty days to create tasks.
//             </Alert>
//           )}

//           {/* Calendar Grid */}
//           <Box
//             bg={cardBg}
//             rounded="lg"
//             shadow="sm"
//             overflow="hidden"
//             border="1px"
//             borderColor={borderColor}
//             onMouseUp={handleMouseUp}
//             onMouseLeave={handleMouseUp}
//           >
//             {/* Day headers */}
//             <Grid templateColumns="repeat(7, 1fr)" borderBottom="1px" borderColor={borderColor}>
//               {DAY_NAMES.map((day) => (
//                 <GridItem key={day} p={3} textAlign="center">
//                   <Text fontSize="sm" fontWeight="medium" color={mutedTextColor}>
//                     {day}
//                   </Text>
//                 </GridItem>
//               ))}
//             </Grid>

//             {/* Calendar days */}
//             <Grid templateColumns="repeat(7, 1fr)">
//               {calendarDays.map((day, index) => {
//                 const tasksOnDay = day ? taskPlanner.getTasksForDay(day) : []

//                 return (
//                   <GridItem
//                     key={index}
//                     minH="80px"
//                     borderRight="1px"
//                     borderBottom="1px"
//                     borderColor={borderColor}
//                     p={2}
//                     position="relative"
//                     bg={dayBackgroundColor(day)}
//                     _hover={day ? { bg: hoverBg } : {}}
//                     cursor={day ? "crosshair" : "default"}
//                     onMouseDown={(e) => handleMouseDown(day, e)}
//                     onMouseEnter={(e) => handleMouseEnter(day, e)}
//                     onClick={(e) => handleDayClick(day, e)}
//                     onDragOver={handleDragOver}
//                     onDrop={(e) => handleDrop(e, day)}
//                     data-day={day || undefined}
//                   >
//                     {day && (
//                       <>
//                         <Text
//                           fontSize="sm"
//                           mb={1}
//                           color={taskPlanner.isToday(day, month, year) ? "blue.500" : textColor}
//                           fontWeight={taskPlanner.isToday(day, month, year) ? "bold" : "medium"}
//                           userSelect="none"
//                         >
//                           {day}
//                           {taskPlanner.isToday(day, month, year) && (
//                             <Box
//                               position="absolute"
//                               top={1}
//                               left={1}
//                               w={6}
//                               h={6}
//                               bg="blue.500"
//                               rounded="full"
//                               display="flex"
//                               alignItems="center"
//                               justifyContent="center"
//                               color="white"
//                               fontSize="xs"
//                             >
//                               {day}
//                             </Box>
//                           )}
//                         </Text>

//                         {/* Debug: Show task count */}
//                         {tasksOnDay.length > 0 && (
//                           <Text fontSize="xs" color="red.500" position="absolute" top="0" right="0">
//                             {tasksOnDay.length}
//                           </Text>
//                         )}

//                         {/* Task indicators for single day tasks or task bars for multi-day tasks */}
//                         {tasksOnDay.length > 0 && (
//                           <>
//                             {/* Multi-day task bars */}
//                             {tasksOnDay.map((task) => {
//                               const position = getTaskPositionInDay(task, day, month, year)
//                               if (!position.isInTask || position.totalDays === 1) return null

//                               return (
//                                 <TaskBar
//                                   key={task.id}
//                                   task={task}
//                                   dayPosition={position.dayPosition}
//                                   totalDays={position.totalDays}
//                                   onDragStart={handleTaskDragStart}
//                                   onResizeStart={handleTaskDragStart}
//                                   onTaskClick={handleTaskClick}
//                                   isDragging={taskDragDrop.isDragging && taskDragDrop.draggedTask?.id === task.id}
//                                 />
//                               )
//                             })}

//                             {/* Single day task indicators */}
//                             <TaskIndicators
//                               tasks={tasksOnDay.filter((task) => {
//                                 const position = getTaskPositionInDay(task, day, month, year)
//                                 return position.totalDays === 1
//                               })}
//                               day={day}
//                               onTaskEdit={handleTaskClick}
//                               dragHandlers={{
//                                 handleDragStart: handleTaskDragStart,
//                                 handleTouchStart: () => {},
//                                 handleTouchMove: () => {},
//                                 handleTouchEnd: () => {},
//                               }}
//                               isDragging={taskDragDrop.isDragging}
//                               draggedTask={taskDragDrop.draggedTask}
//                             />
//                           </>
//                         )}
//                       </>
//                     )}
//                   </GridItem>
//                 )
//               })}
//             </Grid>
//           </Box>
//         </Box>
//       </Box>

//       {/* Modals */}
//       <TaskCreationModal
//         isOpen={isCreateModalOpen && !isEditModalOpen}
//         onClose={() => {
//           console.log("Create modal closing")
//           setSelectionData(null)
//           onCreateModalClose()
//         }}
//         selectionData={selectionData}
//         onCreateTask={handleCreateTask}
//       />

//       <TaskEditModal
//         isOpen={isEditModalOpen && !isCreateModalOpen}
//         onClose={onEditModalClose}
//         task={editingTask}
//         onUpdateTask={handleUpdateTask}
//         onDeleteTask={handleDeleteTask}
//       />

//       {!showFilterPanel && (
//         <FilterModal
//           isOpen={isFilterModalOpen}
//           onClose={onFilterModalClose}
//           filters={taskPlanner.filters}
//           onFiltersChange={taskPlanner.setFilters}
//         />
//       )}
//     </Flex>
//   )
// }

"use client"

import { useState, useEffect } from "react"
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
  useBreakpointValue,
  Alert,
  AlertIcon,
} from "@chakra-ui/react"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"

// Custom hooks
import { useTaskPlanner } from "@/hooks/useTaskPlanner"
import { useDragSelection } from "@/hooks/useDragSelection"
import { useTaskDragDrop } from "@/hooks/useTaskDragDrop"

// Components
import { TaskCreationModal } from "@/components/TaskCreationModal"
import { TaskEditModal } from "@/components/TaskEditModal"
import { TaskBar } from "@/components/TaskBar"
import { TaskIndicators } from "@/components/TaskIndicators"
import { FilterPanel } from "@/components/FilterPanel"
import { FilterModal } from "@/components/FilterModal"

// Utils and constants
import { generateCalendarDays, getTaskPositionInDay } from "@/utils/calendarUtils"
import { MONTH_NAMES, DAY_NAMES } from "@/constants/taskConstants"

export default function TaskPlanner() {
  // Custom hooks
  const taskPlanner = useTaskPlanner()
  const dragSelection = useDragSelection((selectionData) => {
    console.log("=== DRAG SELECTION COMPLETED ===")
    console.log("Selection data:", selectionData)
    setSelectionData(selectionData)
    onCreateModalOpen()
  })
  const taskDragDrop = useTaskDragDrop(taskPlanner.moveTask, taskPlanner.resizeTask)

  // Modal states
  const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onClose: onCreateModalClose } = useDisclosure()
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure()
  const { isOpen: isFilterModalOpen, onOpen: onFilterModalOpen, onClose: onFilterModalClose } = useDisclosure()

  const [selectionData, setSelectionData] = useState(null)
  const [editingTask, setEditingTask] = useState(null)
  const [isDraggingTask, setIsDraggingTask] = useState(false)
  const [isResizing, setIsResizing] = useState(false)

  // Responsive values
  const isMobile = useBreakpointValue({ base: true, lg: false })
  const showFilterPanel = useBreakpointValue({ base: false, lg: true })

  // Color mode values
  const bgColor = useColorModeValue("gray.50", "gray.900")
  const cardBg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.600")
  const textColor = useColorModeValue("gray.900", "white")
  const mutedTextColor = useColorModeValue("gray.500", "gray.400")
  const hoverBg = useColorModeValue("gray.50", "gray.700")
  const selectionBg = useColorModeValue("blue.100", "blue.800")

  // Calendar data
  const year = taskPlanner.currentDate.getFullYear()
  const month = taskPlanner.currentDate.getMonth()
  const calendarDays = generateCalendarDays(year, month)

  // Load tasks on mount
  useEffect(() => {
    console.log("=== COMPONENT MOUNTED ===")
    taskPlanner.loadTasks()
  }, [])

  // Debug: Log tasks whenever they change
  useEffect(() => {
    console.log("=== TASKS CHANGED ===")
    console.log("Current tasks:", taskPlanner.tasks)
    console.log("Tasks count:", taskPlanner.tasks.length)
  }, [taskPlanner.tasks])

  // Event handlers
  const handleMouseDown = (day, e) => {
    if (!day) return

    // Check if we clicked on a task element or resize handle
    const taskElement = e.target.closest("[data-task-id]")
    const resizeHandle = e.target.closest('[draggable="true"]')

    if (taskElement || resizeHandle) {
      setIsDraggingTask(true)
      return // Don't start selection if clicking on a task or resize handle
    }

    // Only start selection if clicking on empty space
    console.log("Starting drag selection on day:", day)
    dragSelection.startSelection(day, month, year)
  }

  const handleMouseEnter = (day, e) => {
    if (!day || !dragSelection.isSelecting || isDraggingTask) return

    // Don't update selection if hovering over a task or if dragging a task
    const taskElement = e.target.closest("[data-task-id]")
    if (taskElement) {
      return
    }

    dragSelection.updateSelection(day, month, year)
  }

  const handleMouseUp = (e) => {
    if (isDraggingTask || isResizing) {
      setIsDraggingTask(false)
      setIsResizing(false)
      taskDragDrop.resetDrag()
      return
    }

    if (dragSelection.isSelecting) {
      // Check if we have any selected days and no tasks were clicked
      const taskElement = e.target.closest("[data-task-id]")
      if (!taskElement && dragSelection.selectedDays.length > 0) {
        dragSelection.endSelection()
      } else {
        // Cancel selection if we clicked on a task
        dragSelection.resetSelection()
      }
    }
  }

  const handleDayClick = (day, e) => {
    console.log("=== DAY CLICKED ===")
    console.log("Day:", day, "Month:", month, "Year:", year)
    console.log("isDragging:", isDraggingTask, "isResizing:", isResizing)
    
    if (!day || isDraggingTask || isResizing) return

    // Check if we clicked on a task
    const taskElement = e.target.closest("[data-task-id]")
    if (taskElement) {
      console.log("Clicked on task element, returning")
      return // Let the task handle its own click
    }

    // Only handle day clicks if we're not in the middle of a drag selection
    if (dragSelection.isSelecting) {
      console.log("Currently selecting, returning")
      return
    }

    // Check for tasks on this day properly
    const tasksOnDay = taskPlanner.getTasksForDay(day)
    console.log("Tasks on day", day, ":", tasksOnDay)
    
    if (tasksOnDay.length === 0) {
      // FIXED: Create proper date objects for single day selection
      const clickedDate = new Date(year, month, day)
      console.log("Created date object:", clickedDate)
      console.log("Date components - Year:", year, "Month:", month, "Day:", day)
      
      const newSelectionData = {
        startDay: day,
        endDay: day,
        startDate: clickedDate,
        endDate: clickedDate,
        duration: 1
      }
      console.log("Setting selection data:", newSelectionData)
      setSelectionData(newSelectionData)
      console.log("Opening create modal")
      onCreateModalOpen()
    } else {
      // If there are tasks, edit the first one
      console.log("Opening edit modal for task:", tasksOnDay[0])
      handleTaskClick(tasksOnDay[0])
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e, day) => {
    e.preventDefault()

    console.log("=== HANDLE DROP ===")
    console.log("Drop target day:", day, "month:", month, "year:", year)

    // FIXED: Use timezone-safe date formatting
    const formatDateSafe = (date) => {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }

    // Handle the consistent resize format
    const dragData = e.dataTransfer.getData("text/plain")
    console.log("Drag data:", dragData)
    
    if (dragData.includes("-resize-")) {
      const [taskId, , operation] = dragData.split("-")
      const task = taskPlanner.tasks.find((t) => t.id === taskId)
      if (task) {
        const dropDate = formatDateSafe(new Date(year, month, day))
        console.log("Resize operation:", operation, "dropDate:", dropDate)
        
        if (operation === "start") {
          // Only resize if new start date is before end date
          const endDate = new Date(task.endDate)
          const newStartDate = new Date(year, month, day)
          console.log("Resize start validation:", { newStartDate, endDate, valid: newStartDate <= endDate })
          
          if (newStartDate <= endDate) {
            taskPlanner.resizeTask(taskId, dropDate, task.endDate)
          }
        } else if (operation === "end") {
          // Only resize if new end date is after start date
          const startDate = new Date(task.startDate)
          const newEndDate = new Date(year, month, day)
          console.log("Resize end validation:", { startDate, newEndDate, valid: newEndDate >= startDate })
          
          if (newEndDate >= startDate) {
            taskPlanner.resizeTask(taskId, task.startDate, dropDate)
          }
        }
      }
    } else if (taskDragDrop.isDragging) {
      console.log("Regular task drag and drop")
      taskDragDrop.handleDrop(day, month, year)
    }

    setIsDraggingTask(false)
    setIsResizing(false)
  }

  const handleCreateTask = (taskData) => {
    console.log("=== HANDLE CREATE TASK ===")
    console.log("Task data received:", taskData)
    
    const success = taskPlanner.addTask(taskData)
    console.log("Task creation success:", success)
    
    if (success) {
      console.log("Closing create modal")
      onCreateModalClose()
      // Clear selection data
      setSelectionData(null)
    } else {
      console.error("Failed to create task")
      // Could show an error message here
    }
  }

  const handleTaskClick = (task) => {
    console.log("=== TASK CLICKED ===")
    console.log("Task:", task, "isDragging:", isDraggingTask, "isResizing:", isResizing)
    
    if (!isDraggingTask && !isResizing) {
      setEditingTask(task)
      onEditModalOpen()
    }
  }

  const handleTaskDragStart = (task, type) => {
    setIsDraggingTask(true)
    // Properly set resize state
    if (type === 'resize-start' || type === 'resize-end') {
      setIsResizing(true)
    }
    taskDragDrop.startDrag(task, type)
  }

  const handleUpdateTask = (taskId, updates) => {
    taskPlanner.updateTask(taskId, updates)
  }

  const handleDeleteTask = (taskId) => {
    taskPlanner.deleteTask(taskId)
  }

  const dayBackgroundColor = (day) => {
    return day
      ? dragSelection.isDaySelected(day, month, year)
        ? selectionBg
        : "transparent"
      : useColorModeValue("gray.100", "gray.800")
  }

  return (
    <Flex minH="100vh" bg={bgColor} pt="100px">
      {/* Debug Panel */}
      {/* <Box position="fixed" top="0" right="0" bg="red.500" color="white" p={2} zIndex={1000} fontSize="xs">
        <Text>Tasks: {taskPlanner.tasks.length}</Text>
        <Button size="xs" onClick={taskPlanner.clearAllTasks} mt={1}>
          Clear All
        </Button>
      </Box> */}

      {/* Filter Panel - Desktop */}
      {showFilterPanel && (
        <Box p={4} w="320px" flexShrink={0}>
          <FilterPanel filters={taskPlanner.filters} onFiltersChange={taskPlanner.setFilters} />
        </Box>
      )}

      {/* Main Calendar */}
      <Box flex={1} p={4}>
        <Box maxW="7xl" mx="auto">
          {/* Header with Filter Button for Mobile */}
          <Flex align="center" justify="space-between" mb={4}>
            {!showFilterPanel && (
              <Button
                onClick={onFilterModalOpen}
                variant="outline"
                size="sm"
                leftIcon={<Box className="w-4 h-4 bg-transparent">🔍</Box>}
              >
                Filters
              </Button>
            )}
          </Flex>

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

          {/* Instructions */}
          <Text fontSize="sm" color={mutedTextColor} mb={4} textAlign="center">
            Hold and drag across empty days to create a task • Click tasks to edit • Drag tasks to move • Drag resize bars to extend duration
          </Text>

          {/* Debug Info */}
          {taskPlanner.tasks.length === 0 && (
            <Alert status="info" mb={4}>
              <AlertIcon />
              No tasks found. Click on empty days to create tasks.
            </Alert>
          )}

          {/* Calendar Grid */}
          <Box
            bg={cardBg}
            rounded="lg"
            shadow="sm"
            overflow="hidden"
            border="1px"
            borderColor={borderColor}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Day headers */}
            <Grid templateColumns="repeat(7, 1fr)" borderBottom="1px" borderColor={borderColor}>
              {DAY_NAMES.map((day) => (
                <GridItem key={day} p={3} textAlign="center">
                  <Text fontSize="sm" fontWeight="medium" color={mutedTextColor}>
                    {day}
                  </Text>
                </GridItem>
              ))}
            </Grid>

            {/* Calendar days */}
            <Grid templateColumns="repeat(7, 1fr)">
              {calendarDays.map((day, index) => {
                const tasksOnDay = day ? taskPlanner.getTasksForDay(day) : []

                return (
                  <GridItem
                    key={index}
                    minH="80px"
                    borderRight="1px"
                    borderBottom="1px"
                    borderColor={borderColor}
                    p={2}
                    position="relative"
                    bg={dayBackgroundColor(day)}
                    _hover={day ? { bg: hoverBg } : {}}
                    cursor={day ? "crosshair" : "default"}
                    onMouseDown={(e) => handleMouseDown(day, e)}
                    onMouseEnter={(e) => handleMouseEnter(day, e)}
                    onClick={(e) => handleDayClick(day, e)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, day)}
                    data-day={day || undefined}
                  >
                    {day && (
                      <>
                        <Text
                          fontSize="sm"
                          mb={1}
                          color={taskPlanner.isToday(day, month, year) ? "blue.500" : textColor}
                          fontWeight={taskPlanner.isToday(day, month, year) ? "bold" : "medium"}
                          userSelect="none"
                        >
                          {day}
                          {taskPlanner.isToday(day, month, year) && (
                            <Box
                              position="absolute"
                              top={1}
                              left={1}
                              w={6}
                              h={6}
                              bg="blue.500"
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

                        {/* Debug: Show task count */}
                        {/* {tasksOnDay.length > 0 && (
                          <Text fontSize="xs" color="red.500" position="absolute" top="0" right="0">
                            {tasksOnDay.length}•
                          </Text>
                        )} */}

                        {/* Task indicators for single day tasks or task bars for multi-day tasks */}
                        {tasksOnDay.length > 0 && (
                          <>
                            {/* Multi-day task bars */}
                            {tasksOnDay.map((task) => {
                              const position = getTaskPositionInDay(task, day, month, year)
                              if (!position.isInTask || position.totalDays === 1) return null

                              return (
                                <TaskBar
                                  key={task.id}
                                  task={task}
                                  dayPosition={position.dayPosition}
                                  totalDays={position.totalDays}
                                  onDragStart={handleTaskDragStart}
                                  onResizeStart={handleTaskDragStart}
                                  onTaskClick={handleTaskClick}
                                  isDragging={taskDragDrop.isDragging && taskDragDrop.draggedTask?.id === task.id}
                                />
                              )
                            })}

                            {/* Single day task indicators */}
                            <TaskIndicators
                              tasks={tasksOnDay.filter((task) => {
                                const position = getTaskPositionInDay(task, day, month, year)
                                return position.totalDays === 1
                              })}
                              day={day}
                              onTaskEdit={handleTaskClick}
                              dragHandlers={{
                                handleDragStart: handleTaskDragStart,
                                handleTouchStart: () => {},
                                handleTouchMove: () => {},
                                handleTouchEnd: () => {},
                              }}
                              isDragging={taskDragDrop.isDragging}
                              draggedTask={taskDragDrop.draggedTask}
                            />
                          </>
                        )}
                      </>
                    )}
                  </GridItem>
                )
              })}
            </Grid>
          </Box>
        </Box>
      </Box>

      {/* Modals */}
      <TaskCreationModal
        isOpen={isCreateModalOpen && !isEditModalOpen}
        onClose={() => {
          console.log("Create modal closing")
          setSelectionData(null)
          onCreateModalClose()
        }}
        selectionData={selectionData}
        onCreateTask={handleCreateTask}
      />

      <TaskEditModal
        isOpen={isEditModalOpen && !isCreateModalOpen}
        onClose={onEditModalClose}
        task={editingTask}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />

      {!showFilterPanel && (
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={onFilterModalClose}
          filters={taskPlanner.filters}
          onFiltersChange={taskPlanner.setFilters}
        />
      )}
    </Flex>
  )
}