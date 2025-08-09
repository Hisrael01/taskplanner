import { VStack, HStack, Box, Text, Badge, Circle, Flex, useColorModeValue, useBreakpointValue } from "@chakra-ui/react"
import { TASK_CATEGORIES } from "@/constants/taskConstants"

export const TaskIndicators = ({ tasks, day, onTaskEdit, dragHandlers, isDragging, draggedTask }) => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const mutedTextColor = useColorModeValue("gray.500", "gray.400")
  const categoryColors = TASK_CATEGORIES.reduce((acc, cat) => {
    acc[cat.name] = {
      bgColor: useColorModeValue(cat.bgColor, `${cat.color}.600`),
      borderColor: cat.borderColor,
      textColor: useColorModeValue("gray.800", "white"),
    }
    return acc
  }, {})

  if (tasks.length === 0) return null

  if (isMobile) {
    return (
      <Flex justify="center" align="center" mt={1} wrap="wrap" gap={1}>
        {tasks.slice(0, 4).map((task) => {
          const category = TASK_CATEGORIES.find((cat) => cat.name === task.category)
          return (
            <Circle
              key={task.id}
              size="8px"
              bg={categoryColors[task.category]?.bgColor}
              border="1px"
              borderColor={category?.borderColor}
              data-task-id={task.id}
              onClick={(e) => {
                e.stopPropagation()
                onTaskEdit(task)
              }}
              cursor="pointer"
            />
          )
        })}
        {tasks.length > 4 && (
          <Text fontSize="2xs" color={mutedTextColor} ml={1}>
            +{tasks.length - 4}
          </Text>
        )}
      </Flex>
    )
  }

  // Desktop view - show full task cards for single day tasks
  return (
    <VStack spacing={1} align="stretch" mt={2}>
      {tasks.slice(0, 3).map((task) => {
        const category = TASK_CATEGORIES.find((cat) => cat.name === task.category)
        const bgColor = categoryColors[task.category]?.bgColor
        const borderColor = category?.borderColor
        const textColor = categoryColors[task.category]?.textColor

        return (
          <Box
            key={task.id}
            position="relative"
            data-task-id={task.id}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.effectAllowed = "move"
              e.dataTransfer.setData("text/plain", task.id)
              dragHandlers.handleDragStart(task, "move")
            }}
            onClick={(e) => {
              e.stopPropagation()
              onTaskEdit(task)
            }}
            fontSize="xs"
            p={2}
            rounded="md"
            cursor="move"
            bg={bgColor}
            shadow="sm"
            _hover={{
              shadow: "md",
              transform: "translateY(-1px)",
              bg: useColorModeValue(category?.bgColor, "gray.600"),
            }}
            transition="all 0.2s"
            border="1px"
            borderColor={borderColor}
            borderLeftWidth="3px"
            opacity={isDragging && draggedTask?.id === task.id ? 0.5 : 1}
          >
            <HStack spacing={2} align="start">
              <Box w={2} h={2} rounded="full" bg={`${category?.color}.500`} mt={0.5} />
              <VStack spacing={0} align="start" flex={1}>
                <Text fontWeight="bold" isTruncated color={textColor} fontSize="xs">
                  {task.name}
                </Text>
                <Badge size="xs" colorScheme={category?.color} variant="subtle">
                  {task.category}
                </Badge>
              </VStack>
            </HStack>

            {/* Resize bar for extending task duration */}
            <Box
              position="absolute"
              right="-2px"
              top="0"
              bottom="0"
              width="4px"
              bg={borderColor}
              cursor="e-resize"
              opacity={0}
              _hover={{ opacity: 1 }}
              transition="opacity 0.2s"
              draggable
              onDragStart={(e) => {
                e.stopPropagation()
                e.dataTransfer.effectAllowed = "move"
                // Consistent format with TaskBar
                e.dataTransfer.setData("text/plain", `${task.id}-resize-end`)
                dragHandlers.handleDragStart(task, "resize-end")
              }}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => {
                e.stopPropagation()
                // resize handler 
                dragHandlers.handleDragStart(task, "resize-end")
              }}
            />
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