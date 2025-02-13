import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Heading, HStack, IconButton, Image, Text, useColorModeValue, useToast } from '@chakra-ui/react'
import React from 'react'
import { useFamilytreeStore } from '../store/familytree';
import { Link } from 'react-router-dom';


const FamilytreeCard = ({ familytree }) => {
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const {deleteFamilytree} = useFamilytreeStore();
    const toast = useToast();

    const handleDeleteProduct = async (pid) => {
        // console.log("Deleting familytree with id:", pid); // Debugging log
        const {success,message} = await deleteFamilytree(pid);
        if(!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    };

  return (
    <Box
        shadow='lg'
        rounded='lg'
        overflow='hidden'
        transition=' 0.3s'
        _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        bg={bg}
    >

        <Image src={familytree.image} alt={familytree.name} h={48} w='full' objectFit='cover' />

        <Box p={4}>
            <Heading as='h3' size='md' mb={2}>
                {familytree.name}
            </Heading>

            <Text fontWeight='bold' fontSize={"15"} color={textColor} mb={4}>
                {familytree.description}
            </Text>

            <HStack spacing={2}>
                <Link to={`/treeeditpage/${familytree._id}`}>
                    <IconButton icon={<EditIcon />} colorScheme='blue' />
                </Link>
                <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(familytree._id)} colorScheme='red' />
            </HStack>
        </Box>
    </Box>
  )
}

export default FamilytreeCard