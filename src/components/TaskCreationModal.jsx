import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Input,
  Textarea,
  Select,
  FormControl,
  FormLabel,
  Button,
  VStack,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { useState } from "react"
import { TASK_CATEGORIES } from "@/constants/taskConstants"

export const TaskCreationModal = ({ isOpen, onClose, selectionData, onCreateTask }) => {
  const [taskName, setTaskName] = useState("")
  const [taskDescription, setTaskDescription] = useState("")
  const [category, setCategory] = useState("To Do")

  const modalBg = useColorModeValue("white", "gray.800")
  const modalTextColor = useColorModeValue("gray.900", "white")
  const inputBg = useColorModeValue("white", "gray.700")
  const inputBorderColor = useColorModeValue("gray.200", "gray.600")
  const placeholderColor = useColorModeValue("gray.500", "gray.400")

  const handleCreate = () => {
    if (!taskName.trim() || !selectionData) return

    //Convert Date objects to YYYY-MM-DD strings (avoiding timezone issues)
    const formatDate = (date) => {
      if (date instanceof Date) {
        // Use local date components to avoid timezone conversion issues
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
      }
      return date
    }

    onCreateTask({
      name: taskName,
      description: taskDescription,
      category,
      startDate: formatDate(selectionData.startDate),
      endDate: formatDate(selectionData.endDate),
    })

    setTaskName("")
    setTaskDescription("")
    setCategory("To Do")
    onClose()
  }

  const handleClose = () => {
    setTaskName("")
    setTaskDescription("")
    setCategory("To Do")
    onClose()
  }

  if (!selectionData) return null

  // Calculate duration 
  const calculateDuration = () => {
    if (!selectionData.startDate || !selectionData.endDate) return 1
    
    const start = selectionData.startDate instanceof Date 
      ? selectionData.startDate 
      : new Date(selectionData.startDate)
    const end = selectionData.endDate instanceof Date 
      ? selectionData.endDate 
      : new Date(selectionData.endDate)
    
    const diffTime = Math.abs(end - start)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
  }

  const duration = calculateDuration()

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <ModalOverlay />
      <ModalContent bg={modalBg} color={modalTextColor}>
        <ModalHeader>Create New Task</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={4}>
            <Text fontSize="sm" color="gray.500">
              Duration: {duration} day{duration > 1 ? "s" : ""}
            </Text>

            <FormControl>
              <FormLabel color={modalTextColor}>Task Name</FormLabel>
              <Input
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Enter task name"
                bg={inputBg}
                borderColor={inputBorderColor}
                color={modalTextColor}
                _placeholder={{ color: placeholderColor }}
                autoFocus
              />
            </FormControl>

            <FormControl>
              <FormLabel color={modalTextColor}>Description</FormLabel>
              <Textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Enter task description (optional)"
                bg={inputBg}
                borderColor={inputBorderColor}
                color={modalTextColor}
                _placeholder={{ color: placeholderColor }}
                rows={3}
                resize="vertical"
              />
            </FormControl>

            <FormControl>
              <FormLabel color={modalTextColor}>Category</FormLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                bg={inputBg}
                borderColor={inputBorderColor}
                color={modalTextColor}
              >
                {TASK_CATEGORIES.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={2}>
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleCreate} isDisabled={!taskName.trim()}>
              Create Task
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}