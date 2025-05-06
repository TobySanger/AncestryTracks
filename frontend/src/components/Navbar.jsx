// Author : Toby Sanger 
// Date : 06/05/2025 dd/mm/yyyy

// Description :
// This file defines the global navigation bar component for the application.
// It includes branding (Ancestry Tracjks), a link to the tree collection, a toggle for light/dark mode,
// and a link to the user account settings.

import { Button, Container, Flex, HStack, Text, useColorMode } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { GiFruitTree } from "react-icons/gi"
import { IoMoon } from "react-icons/io5"
import { LuSun } from "react-icons/lu"


const Navbar = () => {
    // useColorMode is a Chakra UI hook that allows us to access the current color mode (light or dark) and a function to toggle it.
    const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Container maxW={"1140px"} px={4}>
        <Flex
            h={12}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDir={{
                base: "column",
                sm:"row"
            }}
        >
            <Text
                fontSize={{ base: "22", sm: "28" }}
                fontWeight={"bold"}
                textTransform={"uppercase"}
                textAlign={"center"}
                bgGradient='linear(to-r, #7928CA, #FF0080)'
                bgClip={"text"}
            >
                <Link to={"/homepage"}>Ancestry Tracks 🌳</Link>

            </Text>

            <HStack spacing={2} alignItems={"center"}>
                <Link to={"/treecollection"}>
                    <Button>
                        <GiFruitTree fontSize={20}/>
                    </Button>
                </Link>
                <Button onClick={toggleColorMode}> {/* // Toggles between light and dark mode */}
                    {colorMode === "light" ? <IoMoon/> : <LuSun size="20"/>}
                </Button>
                <Link to={"/useraccount"}>
                    <Text fontSize={15} fontWeight={"bold"}>
                        User 
                    </Text>
                </Link>
            </HStack>
        </Flex>
    
    </Container>
)}

export default Navbar