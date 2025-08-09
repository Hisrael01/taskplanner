import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Divider,
  useColorModeValue
} from '@chakra-ui/react'
import { TASK_CATEGORIES, TIME_RANGES } from '@/constants/taskConstants'

export const FilterPanel = ({ filters, onFiltersChange }) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const textColor = useColorModeValue('gray.900', 'white')
  const inputBg = useColorModeValue('white', 'gray.700')
  const inputBorderColor = useColorModeValue('gray.200', 'gray.600')
  const placeholderColor = useColorModeValue('gray.500', 'gray.400')

  const handleCategoryChange = (category, checked) => {
    onFiltersChange({
      ...filters,
      categories: {
        ...filters.categories,
        [category]: checked
      }
    })
  }

  const handleTimeRangeChange = (value) => {
    onFiltersChange({
      ...filters,
      timeRange: value
    })
  }

  const handleSearchChange = (value) => {
    onFiltersChange({
      ...filters,
      searchQuery: value
    })
  }

  return (
    <Box
      bg={bgColor}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="lg"
      p={4}
      shadow="sm"
      minW="280px"
    >
      <VStack spacing={4} align="stretch">
        {/* Search */}
        <FormControl>
          <FormLabel fontSize="sm" fontWeight="bold" color={textColor}>
            Search by Name
          </FormLabel>
          <Input
            placeholder="Search tasks..."
            value={filters.searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            size="sm"
            bg={inputBg}
            borderColor={inputBorderColor}
            color={textColor}
            _placeholder={{ color: placeholderColor }}
          />
        </FormControl>

        <Divider />

        {/* Category Filters */}
        <FormControl>
          <FormLabel fontSize="sm" fontWeight="bold" color={textColor}>
            Categories
          </FormLabel>
          <VStack spacing={2} align="stretch">
            {TASK_CATEGORIES.map(category => (
              <Checkbox
                key={category.name}
                isChecked={filters.categories[category.name]}
                onChange={(e) => handleCategoryChange(category.name, e.target.checked)}
                colorScheme={category.color}
              >
                <Text fontSize="sm" color={textColor}>{category.name}</Text>
              </Checkbox>
            ))}
          </VStack>
        </FormControl>

        <Divider />

        {/* Time Range Filters */}
        <FormControl>
          <FormLabel fontSize="sm" fontWeight="bold" color={textColor}>
            Time Range
          </FormLabel>
          <RadioGroup
            value={filters.timeRange}
            onChange={handleTimeRangeChange}
          >
            <VStack spacing={2} align="stretch">
              <Radio value="" size="sm">
                <Text fontSize="sm" color={textColor}>All tasks</Text>
              </Radio>
              {TIME_RANGES.map(range => (
                <Radio key={range.value} value={range.value} size="sm">
                  <Text fontSize="sm" color={textColor}>{range.label}</Text>
                </Radio>
              ))}
            </VStack>
          </RadioGroup>
        </FormControl>
      </VStack>
    </Box>
  )
}
