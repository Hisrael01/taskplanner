import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  useColorModeValue
} from '@chakra-ui/react'
import { FilterPanel } from './FilterPanel'

export const FilterModal = ({ isOpen, onClose, filters, onFiltersChange }) => {
  const modalBg = useColorModeValue('white', 'gray.800')
  const modalTextColor = useColorModeValue('gray.900', 'white')

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent bg={modalBg} color={modalTextColor} mx={4}>
        <ModalHeader>Filters & Search</ModalHeader>
        <ModalCloseButton />
        
        <ModalBody p={0}>
          <FilterPanel
            filters={filters}
            onFiltersChange={onFiltersChange}
          />
        </ModalBody>
        
        <ModalFooter>
          <Button onClick={onClose} width="full">
            Apply Filters
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
