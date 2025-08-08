import {
  Box,
  Button,
  Flex,
  Select,
  FormControl,
  FormLabel,
  Collapse,
  useColorModeValue
} from '@chakra-ui/react'
import { CATEGORIES } from '@/constants/taskConstants'

export const FilterSection = ({ 
  showFilters, 
  setShowFilters, 
  filters, 
  setFilters, 
  onClearFilters 
}) => {
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const textColor = useColorModeValue('gray.900', 'white')
  const inputBg = useColorModeValue('white', 'gray.700')
  const inputBorderColor = useColorModeValue('gray.200', 'gray.600')

  return (
    <>
      {/* Filter Button */}
      <Flex justify="flex-end" mb={4}>
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          size="sm"
          leftIcon={<Box className="w-4 h-4">🔍</Box>}
        >
          Filters
        </Button>
      </Flex>

      {/* Filters */}
      <Collapse in={showFilters}>
        <Box bg={cardBg} p={6} rounded="lg" shadow="sm" mb={6} border="1px" borderColor={borderColor}>
          <Flex direction={{ base: 'column', sm: 'row' }} gap={4} align={{ base: 'stretch', sm: 'end' }}>
            <FormControl flex={1}>
              <FormLabel color={textColor}>Category</FormLabel>
              <Select 
                value={filters.category} 
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                placeholder="All categories"
                bg={inputBg}
                borderColor={inputBorderColor}
                color={textColor}
              >
                {CATEGORIES.map(category => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            
            <FormControl flex={1}>
              <FormLabel color={textColor}>Priority</FormLabel>
              <Select 
                value={filters.priority} 
                onChange={(e) => setFilters({...filters, priority: e.target.value})}
                placeholder="All priorities"
                bg={inputBg}
                borderColor={inputBorderColor}
                color={textColor}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
            </FormControl>
            
            <Button onClick={onClearFilters} variant="outline" size="sm">
              Clear
            </Button>
          </Flex>
        </Box>
      </Collapse>
    </>
  )
}
