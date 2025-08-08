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
  Grid,
  useColorModeValue
} from '@chakra-ui/react'
import { CATEGORIES } from '@/constants/taskConstants'

export const TaskModal = ({ 
  isOpen, 
  onClose, 
  formData, 
  setFormData, 
  editingTask, 
  onSave, 
  onDelete 
}) => {
  const modalBg = useColorModeValue('white', 'gray.800')
  const modalTextColor = useColorModeValue('gray.900', 'white')
  const inputBg = useColorModeValue('white', 'gray.700')
  const inputBorderColor = useColorModeValue('gray.200', 'gray.600')
  const mutedTextColor = useColorModeValue('gray.500', 'gray.400')

  const handleSave = () => {
    if (!formData.title.trim()) return
    onSave()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent bg={modalBg} color={modalTextColor}>
        <ModalHeader color={modalTextColor}>
          {editingTask ? 'Edit Task' : 'Create New Task'}
        </ModalHeader>
        <ModalCloseButton color={modalTextColor} />
        
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel color={modalTextColor}>Title</FormLabel>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Enter task title"
                bg={inputBg}
                borderColor={inputBorderColor}
                color={modalTextColor}
                _placeholder={{ color: mutedTextColor }}
              />
            </FormControl>
            
            <FormControl>
              <FormLabel color={modalTextColor}>Description</FormLabel>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Enter task description"
                rows={3}
                bg={inputBg}
                borderColor={inputBorderColor}
                color={modalTextColor}
                _placeholder={{ color: mutedTextColor }}
              />
            </FormControl>
            
            <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
              <FormControl>
                <FormLabel color={modalTextColor}>Category</FormLabel>
                <Select 
                  value={formData.category} 
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  placeholder="Select category"
                  bg={inputBg}
                  borderColor={inputBorderColor}
                  color={modalTextColor}
                >
                  {CATEGORIES.map(category => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              
              <FormControl>
                <FormLabel color={modalTextColor}>Priority</FormLabel>
                <Select 
                  value={formData.priority} 
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  bg={inputBg}
                  borderColor={inputBorderColor}
                  color={modalTextColor}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Select>
              </FormControl>
            </Grid>
          </VStack>
        </ModalBody>
        
        <ModalFooter>
          <HStack spacing={2} w="full" justify="space-between">
            {editingTask && (
              <Button colorScheme="red" onClick={onDelete}>
                Delete
              </Button>
            )}
            
            <HStack spacing={2} ml="auto">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleSave}>
                {editingTask ? 'Update' : 'Create'}
              </Button>
            </HStack>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
