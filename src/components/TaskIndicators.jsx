import { 
  VStack, 
  HStack, 
  Box, 
  Text, 
  Badge, 
  Circle, 
  Flex,
  useColorModeValue,
  useBreakpointValue 
} from '@chakra-ui/react'
import { PRIORITY_COLORS, PRIORITY_TASK_COLORS } from '@/constants/taskConstants'
import { getTaskColors } from '@/utils/calendarUtils'

export const TaskIndicators = ({ 
  tasks, 
  day, 
  onTaskEdit, 
  dragHandlers,
  isDragging,
  draggedTask 
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const mutedTextColor = useColorModeValue('gray.500', 'gray.400')

  if (tasks.length === 0) return null

  if (isMobile) {
    return (
      <Flex justify="center" align="center" mt={1} wrap="wrap" gap={1}>
        {tasks.slice(0, 4).map((task) => (
          <Circle
            key={task.id}
            size="8px"
            bg={`${PRIORITY_COLORS[task.priority]}.500`}
            border="1px"
            borderColor={`${PRIORITY_COLORS[task.priority]}.600`}
          />
        ))}
        {tasks.length > 4 && (
          <Text fontSize="2xs" color={mutedTextColor} ml={1}>
            +{tasks.length - 4}
          </Text>
        )}
      </Flex>
    )
  }

  // Desktop view - show full task cards
  return (
    <VStack spacing={1} align="stretch">
      {tasks.slice(0, 3).map(task => {
        const taskColors = getTaskColors(task.priority, useColorModeValue, PRIORITY_TASK_COLORS)
        return (
          <Box
            key={task.id}
            draggable={!isMobile}
            onDragStart={!isMobile ? (e) => dragHandlers.handleDragStart(e, task) : undefined}
            onTouchStart={!isMobile ? (e) => dragHandlers.handleTouchStart(e, task) : undefined}
            onTouchMove={!isMobile ? dragHandlers.handleTouchMove : undefined}
            onTouchEnd={!isMobile ? dragHandlers.handleTouchEnd : undefined}
            onClick={(e) => {
              e.stopPropagation()
              onTaskEdit(task)
            }}
            fontSize="xs"
            p={2}
            rounded="md"
            cursor={!isMobile ? "move" : "pointer"}
            bg={taskColors.bg}
            shadow="sm"
            _hover={{ 
              shadow: 'md', 
              transform: 'translateY(-1px)',
              bg: useColorModeValue(
                PRIORITY_TASK_COLORS[task.priority].light,
                'gray.600'
              )
            }}
            transition="all 0.2s"
            border="1px"
            borderColor={taskColors.borderColor}
            borderLeftWidth="3px"
            opacity={isDragging && draggedTask?.id === task.id ? 0.5 : 1}
          >
            <HStack spacing={2} align="start">
              <Box w={2} h={2} rounded="full" bg={`${task.color}.500`} mt={0.5} />
              <VStack spacing={0} align="start" flex={1}>
                <Text 
                  fontWeight="bold" 
                  isTruncated 
                  color={taskColors.textColor}
                  fontSize="xs"
                >
                  {task.title}
                </Text>
                <Badge 
                  size="xs" 
                  colorScheme={PRIORITY_COLORS[task.priority]}
                  variant="subtle"
                >
                  {task.priority}
                </Badge>
              </VStack>
            </HStack>
          </Box>
        )
      })}
      
      {tasks.length > 3 && (
        <Text fontSize="xs" color={mutedTextColor} pl={1}>
          +{tasks.length - 3} more
        </Text>
      )}
    </VStack>
  )
}
