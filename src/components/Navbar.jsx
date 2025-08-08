import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import {
  Box,
  Container,
  Flex,
  HStack,
  VStack,
  Text,
  IconButton,
  useDisclosure,
  Badge,
  Link,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import { FaBars } from "react-icons/fa"
import { SunIcon, MoonIcon } from "@chakra-ui/icons"

const MotionBox = motion(Box)

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { colorMode, toggleColorMode } = useColorMode()
  
  // Color mode values
  const bgColor = useColorModeValue(
    scrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
    scrolled ? "rgba(26, 54, 93, 0.95)" : "transparent"
  )
  const textColor = useColorModeValue("gray.800", "white")
  const borderColor = useColorModeValue(
    "rgba(0, 0, 0, 0.1)",
    "rgba(255, 255, 255, 0.1)"
  )

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavigation = (href) => {
    navigate(href)
  }

  return (
    <>
      <MotionBox
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex="1000"
        bg={bgColor}
        backdropFilter={scrolled ? "blur(10px)" : "none"}
        borderBottom={scrolled ? "1px solid" : "none"}
        borderColor={borderColor}
        transition="all 0.3s ease"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        color={textColor}
        shadow={scrolled ? "md" : "none"}
      >
        <Container maxW="7xl" py="4">
          <Flex justify="space-between" align="center">
            {/* Logo */}
            <Link href="/">
              <HStack 
                spacing="3" 
                cursor="pointer" 
                _hover={{ transform: "scale(1.05)" }} 
                transition="all 0.3s"
              >
                <Box
                  w="10"
                  h="10"
                  bg="linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%)"
                  borderRadius="xl"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="white"
                  fontWeight="bold"
                  fontSize="lg"
                >
                  TP
                </Box>
                <VStack spacing="0" align="start">
                  <Text fontSize="xl" fontWeight="bold" lineHeight="1">
                    TaskPlanner
                  </Text>
                  <Badge colorScheme="orange" fontSize="xs" px="2" py="0">
                    Beta
                  </Badge>
                </VStack>
              </HStack>
            </Link>

            {/* Desktop Navigation */}
            <HStack spacing="4" display={{ base: "none", lg: "flex" }}>
              {/* Dark Mode Toggle */}
              <IconButton
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                variant="ghost"
                size="md"
                aria-label="Toggle color mode"
                _hover={{ 
                  bg: useColorModeValue("gray.100", "rgba(255, 255, 255, 0.1)"),
                  transform: "scale(1.1)"
                }}
                transition="all 0.2s"
              />
            </HStack>

            {/* Mobile Menu Button */}
            <HStack spacing="2" display={{ base: "flex", lg: "none" }}>
              {/* Mobile Dark Mode Toggle */}
              <IconButton
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                variant="ghost"
                size="sm"
                aria-label="Toggle color mode"
                _hover={{ 
                  bg: useColorModeValue("gray.100", "rgba(255, 255, 255, 0.1)"),
                  transform: "scale(1.1)"
                }}
                transition="all 0.2s"
              />
              
              <IconButton
                display={{ base: "flex", lg: "none" }}
                icon={<FaBars />}
                variant="ghost"
                color={textColor}
                _hover={{ 
                  color: "#ff6b35", 
                  bg: useColorModeValue("gray.100", "rgba(255, 255, 255, 0.1)")
                }}
                onClick={onOpen}
                aria-label="Open menu"
              />
            </HStack>
          </Flex>
        </Container>
      </MotionBox>
    </>
  )
}

export default Navbar
