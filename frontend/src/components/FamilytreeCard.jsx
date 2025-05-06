// Author : Toby Sanger 
// Date : 06/05/2025 dd/mm/yyyy

// Description :
// This component renders a card for each family tree in the collection.
// It displays the tree's name, description, and image.
// It also provides buttons to edit or delete the tree.
// The component uses Chakra UI for styling and layout.

import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Heading, HStack, IconButton, Image, Text, useColorModeValue, useToast } from '@chakra-ui/react'
import React from 'react'
import { useFamilytreeStore } from '../store/familytree';
import { Link } from 'react-router-dom'; // Nav between pages


const FamilytreeCard = ({ familytree }) => {
    // Using Chakra UI's useColorModeValue to set colors based on the current color mode
    // This allows the component to adapt to light and dark themes
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const {deleteFamilytree} = useFamilytreeStore(); // Zustand store function to delete a family tree via backend API
    const toast = useToast(); // Chakra UI toast hook to show alerts/notifications

    // Function to handle the deletion of a family tree
    // It sends a request to the backend and updates the store
    // It also provides user feedback via toast notifications
    // After deletion, it updates the UI by filtering out the deleted tree
    // It also provides user feedback via toast notifications 
    const handleDeleteTree = async (pid) => {
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
                <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteTree(familytree._id)} colorScheme='red' />
            </HStack>
        </Box>
    </Box>
  )
}

export default FamilytreeCard