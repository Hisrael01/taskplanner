import { Box, Text, Tooltip, useColorModeValue } from "@chakra-ui/react"
import { TASK_CATEGORIES } from "@/constants/taskConstants"

export const TaskBar = ({ task, dayPosition, totalDays, onDragStart, onResizeStart, onTaskClick, isDragging }) => {
  const category = TASK_CATEGORIES.find((cat) => cat.name === task.category)
  const bgColor = useColorModeValue(category?.bgColor, `${category?.color}.800`)
  const borderColor = category?.borderColor
  const textColor = useColorModeValue("gray.800", "white")

  const isFirstDay = dayPosition === 0
  const isLastDay = dayPosition === totalDays - 1
  const isMiddleDay = !isFirstDay && !isLastDay
  const isSingleDay = totalDays === 1

  const getBorderRadius = () => {
    if (isSingleDay) return "md"
    if (isFirstDay) return "6px 0 0 6px"
    if (isLastDay) return "0 6px 6px 0"
    return "0"
  }

  const handleMouseDown = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const width = rect.width

    // Determine drag type based on click position
    if (clickX < 10 && isFirstDay && !isSingleDay) {
      onResizeStart(task, "resize-start")
    } else if (clickX > width - 10 && isLastDay) {
      onResizeStart(task, "resize-end")
    } else {
      onDragStart(task, "move")
    }
  }

  const handleClick = (e) => {
    e.stopPropagation()
    // Only trigger click if we're not dragging
    if (!isDragging && onTaskClick) {
      onTaskClick(task)
    }
  }

  return (
    <Tooltip label={`${task.name} (${task.category}) - Click to edit, drag edges to resize`} hasArrow>
      <Box
        position="absolute"
        top="20px"
        left="2px"
        right="2px"
        height="20px"
        bg={bgColor}
        border="2px solid"
        borderColor={borderColor}
        borderRadius={getBorderRadius()}
        cursor="move"
        opacity={isDragging ? 0.5 : 1}
        transition="all 0.2s"
        _hover={{
          transform: "translateY(-1px)",
          shadow: "md",
        }}
        data-task-id={task.id}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        draggable
        onDragStart={(e) => {
          e.dataTransfer.effectAllowed = "move"
          e.dataTransfer.setData("text/plain", task.id)
          onDragStart(task, "move")
        }}
      >
        {/* Left resize handle -: Only show on first day */}
        {!isSingleDay && isFirstDay && (
          <Box
            position="absolute"
            left="-2px"
            top="-2px"
            bottom="-2px"
            width="6px"
            bg={borderColor}
            cursor="w-resize"
            opacity={0}
            _hover={{ opacity: 1 }}
            transition="opacity 0.2s"
            draggable
            onDragStart={(e) => {
              e.stopPropagation()
              e.dataTransfer.effectAllowed = "move"
              //Consistent format
              e.dataTransfer.setData("text/plain", `${task.id}-resize-start`)
              onResizeStart(task, "resize-start")
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => {
              e.stopPropagation()
              onResizeStart(task, "resize-start")
            }}
          />
        )}

        {/* Right resize handle -: Show on last day for multi-day OR single day */}
        {(isLastDay || isSingleDay) && (
          <Box
            position="absolute"
            right="-2px"
            top="-2px"
            bottom="-2px"
            width="6px"
            bg={borderColor}
            cursor="e-resize"
            opacity={0}
            _hover={{ opacity: 1 }}
            transition="opacity 0.2s"
            draggable
            onDragStart={(e) => {
              e.stopPropagation()
              e.dataTransfer.effectAllowed = "move"
              //  Consistent format
              e.dataTransfer.setData("text/plain", `${task.id}-resize-end`)
              onResizeStart(task, "resize-end")
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => {
              e.stopPropagation()
              onResizeStart(task, "resize-end")
            }}
          />
        )}

        {/* Task name - only show on first day or single day */}
        {(isFirstDay || isSingleDay) && (
          <Text fontSize="xs" fontWeight="bold" color={textColor} px={2} py={0.5} isTruncated lineHeight="16px">
            {task.name}
          </Text>
        )}
      </Box>
    </Tooltip>
  )
}