"use client"

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
  useColorModeValue,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { TASK_CATEGORIES } from "@/constants/taskConstants"

export const TaskEditModal = ({ isOpen, onClose, task, onUpdateTask, onDeleteTask }) => {
  const [taskName, setTaskName] = useState("")
  const [taskDescription, setTaskDescription] = useState("")
  const [category, setCategory] = useState("To Do")

  const modalBg = useColorModeValue("white", "gray.800")
  const modalTextColor = useColorModeValue("gray.900", "white")
  const inputBg = useColorModeValue("white", "gray.700")
  const inputBorderColor = useColorModeValue("gray.200", "gray.600")
  const placeholderColor = useColorModeValue("gray.500", "gray.400")

  useEffect(() => {
    if (task) {
      setTaskName(task.name)
      setTaskDescription(task.description || "")
      setCategory(task.category)
    }
  }, [task])

  const handleUpdate = () => {
    if (!taskName.trim() || !task) return

    onUpdateTask(task.id, {
      name: taskName,
      description: taskDescription,
      category,
    })

    onClose()
  }

  const handleDelete = () => {
    if (!task) return
    onDeleteTask(task.id)
    onClose()
  }

  const handleClose = () => {
    if (task) {
      setTaskName(task.name)
      setTaskDescription(task.description || "")
      setCategory(task.category)
    }
    onClose()
  }

  if (!task) return null

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <ModalOverlay />
      <ModalContent bg={modalBg} color={modalTextColor}>
        <ModalHeader>Edit Task</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={4}>
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
          <HStack spacing={2} w="full" justify="space-between">
            <Button colorScheme="red" onClick={handleDelete}>
              Delete
            </Button>

            <HStack spacing={2}>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleUpdate} isDisabled={!taskName.trim()}>
                Update Task
              </Button>
            </HStack>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
