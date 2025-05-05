import {Box, Container, Flex, HStack, Text, useColorModeValue} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Footer = () => {
    const textColor = useColorModeValue("white", "gray.200");

  return (
    <Container as="Footer" maxW="100%" bg="gray.700" color={textColor} px={4}>
        <Flex
            maxW="100%"
            h={12}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDir={{
                base: "column",
                sm:"row"
            }}
        >
                <HStack spacing={4} alignItems={"center"}>
                    <Link to="/aboutus" >About Us </Link>

                </HStack>

                <Text
                    fontSize={{ base: "14", sm: "16" }}
                    textAlign={"center"}
                    bgGradient='linear(to-r,rgb(225, 223, 228),rgb(250, 248, 249))'
                    bgClip={"text"}
                >
                    <Link to="/homepage" > © Ancestry Tracks (2025) </Link>
                </Text>

                <HStack spacing={4} alignItems={"left"}>
                    <Link to={"/useraccount"}>Settings </Link>
                </HStack>

            </Flex>
        
    </Container>

)}

export default Footer