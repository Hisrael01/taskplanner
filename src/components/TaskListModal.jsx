import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  VStack,
  HStack,
  Box,
  Text,
  Badge,
  Circle,
  useColorModeValue
} from '@chakra-ui/react'
import { PRIORITY_COLORS } from '@/constants/taskConstants'
import { getTaskColors } from '@/utils/calendarUtils'

export const TaskListModal = ({ 
  isOpen, 
  onClose, 
  tasks, 
  onTaskEdit 
}) => {
  const modalBg = useColorModeValue('white', 'gray.800')
  const modalTextColor = useColorModeValue('gray.900', 'white')
  const mutedTextColor = useColorModeValue('gray.500', 'gray.400')

  const handleTaskClick = (task) => {
    onTaskEdit(task)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent bg={modalBg} color={modalTextColor} mx={4}>
        <ModalHeader py={3} fontSize="lg">
          Tasks ({tasks.length})
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody py={2} maxH="60vh" overflowY="auto">
          <VStack spacing={2} align="stretch">
            {tasks.map(task => {
              const taskColors = getTaskColors(task.priority, useColorModeValue, {
                low: { light: 'green.50', dark: 'green.900', border: 'green.400', text: 'green.800' },
                medium: { light: 'yellow.50', dark: 'yellow.900', border: 'yellow.400', text: 'yellow.800' },
                high: { light: 'red.50', dark: 'red.900', border: 'red.400', text: 'red.800' }
              })
              
              return (
                <Box
                  key={task.id}
                  p={3}
                  rounded="md"
                  bg={taskColors.bg}
                  border="1px"
                  borderColor={taskColors.borderColor}
                  borderLeftWidth="3px"
                  onClick={() => handleTaskClick(task)}
                  cursor="pointer"
                  _hover={{ shadow: 'sm' }}
                >
                  <HStack justify="space-between" align="start">
                    <VStack align="start" spacing={1} flex={1}>
                      <HStack>
                        <Circle size="8px" bg={`${task.color}.500`} />
                        <Text fontWeight="bold" color={taskColors.textColor} fontSize="sm" noOfLines={1}>
                          {task.title}
                        </Text>
                      </HStack>
                      {task.description && (
                        <Text fontSize="xs" color={mutedTextColor} noOfLines={2} pl={4}>
                          {task.description}
                        </Text>
                      )}
                    </VStack>
                    <VStack spacing={1} align="end">
                      <Badge size="xs" colorScheme={PRIORITY_COLORS[task.priority]}>
                        {task.priority}
                      </Badge>
                      {task.category && (
                        <Badge size="xs" variant="outline" colorScheme={task.color}>
                          {task.category}
                        </Badge>
                      )}
                    </VStack>
                  </HStack>
                </Box>
              )
            })}
          </VStack>
        </ModalBody>
        
        {/* <ModalFooter py={3}>
          <Button size="sm" onClick={onClose} width="full">
            Close
          </Button>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  )
}
