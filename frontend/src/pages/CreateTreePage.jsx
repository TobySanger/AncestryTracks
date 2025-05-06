// Author : Toby Sanger 
// Date : 06/05/2025 dd/mm/yyyy

// Description:
// This page provides a form for the user to create a new family tree.
// It uses Chakra UI for styling, Zustand (via useFamilytreeStore) for state management,
// and toast notifications to provide user feedback on success or error.
// The form includes fields for the family tree name, description, and image URL.

import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react"
import { useFamilytreeStore } from "../store/familytree";

const CreateTreePage = () => {
    // Local state to track the form inputs
    const [newFamilytree, setNewFamilytree] = useState ({
        name: "",
        description: "",
        image: "",
    });

    const toast = useToast() // Chakra UI toast hook to show alerts/notifications


    const {createFamilytree} = useFamilytreeStore() // Zustand store function to create a new family tree via backend API

    // Function to handle the form submission
    // It sends the new family tree data to the backend and updates the store
    const handleAddFamilytree = async() => {
        const { success, message } = await createFamilytree(newFamilytree)
        if(!success) {
            toast({
                title:"Error",
                description: message,
                status: "error",
                isClosable: true
            })
        } else {
            toast ({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true,
            });
        }
        setNewFamilytree({ name: "", description: "", image: ""}); // Clear form after submission
    };

    // Render the form for creating a new family tree
    // It includes input fields for name, description, and image URL
    // A button to submit the form
    // The form is styled using Chakra UI components like Box, Input, Button, and VStack
    // The form is responsive and adjusts to different screen sizes
    // The form is centered on the page using Chakra UI's Container and VStack components
    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"lg"} textAlign={"center"} mb={8} mt={7}  >
                    Create New Family Tree
                </Heading>
                <Box
                    w={"full"} bg={useColorModeValue("white", "gray.800")}
                    p={6} rounded={"lg"} shadow={"md"}
                >
                    <VStack spacing={4}>
                        <Input 
                            placeholder="FamilyTree Name"
                            name="name"
                            value={newFamilytree.name}
                            onChange={(e) => setNewFamilytree({ ...newFamilytree, name: e.target.value})}
                        />
                        <Input 
                            placeholder="Description"
                            description="description"
                            value={newFamilytree.description}
                            onChange={(e) => setNewFamilytree({ ...newFamilytree, description: e.target.value})}
                        />
                        <Input 
                            placeholder="Image URL"
                            image="image"
                            value={newFamilytree.image}
                            onChange={(e) => setNewFamilytree({ ...newFamilytree, image: e.target.value})}
                        />
                        <Button colorScheme="blue" onClick={handleAddFamilytree} w='full'>Add Family Tree</Button>
                    </VStack>

                </Box>
            </VStack>
        </Container>
    )
}

export default CreateTreePage