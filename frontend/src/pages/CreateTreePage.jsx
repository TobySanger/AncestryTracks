import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react"
import { useFamilytreeStore } from "../store/familytree";

const CreateTreePage = () => {
    const [newFamilytree, setNewFamilytree] = useState ({
        name: "",
        description: "",
        image: "",
    });

    const toast = useToast()

    const {createFamilytree} = useFamilytreeStore()

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
        setNewFamilytree({ name: "", description: "", image: ""});
    };

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